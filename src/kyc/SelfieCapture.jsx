import { useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Square } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { b64ToDataUrl } from './api';
import { grabFrame, sleep, takeStill, useCamera } from './camera';
import { useKyc } from './KycContext';
import { Button, Chip, ErrorBox } from './ui';
import { cx } from '../lib/cx';

const STATE_TONE = { SEARCHING: 'amber', READY_FOR_STILL: 'cyan', CAPTURED: 'emerald', EXPIRED: 'rose' };
const STATE_TEXT = {
  SEARCHING: ['Finding a good frame', 'در جست‌وجوی تصویر مناسب'],
  READY_FOR_STILL: ['Taking the photo', 'در حال گرفتن عکس'],
  CAPTURED: ['Captured', 'گرفته شد'],
  EXPIRED: ['Expired', 'منقضی شد'],
};

// Runs one face-capture session against the API:
//   frames (~3/s) -> stream qualifies -> full-resolution still -> capture_id.
// `startSession` lets the orchestrator open the session through its case.
export default function SelfieCapture({ startSession, onCaptured, onFrame, compact }) {
  const { client, setCapture } = useKyc();
  const { t, isFa } = useLang();
  const { videoRef, streamRef, start: startCamera, stop: stopCamera, active: cameraOn } = useCamera();
  const running = useRef(false);
  const [phase, setPhase] = useState('idle'); // idle | running | done | failed
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [selfie, setSelfie] = useState(null);

  useEffect(() => () => (running.current = false), []);

  async function run() {
    setError(null);
    setFeedback(null);
    setSelfie(null);
    setPhase('running');
    let sid;
    try {
      sid = startSession ? await startSession() : (await client.captureStart()).session_id;
      await startCamera(1920);
    } catch (err) {
      stopCamera();
      setError(err);
      setPhase('failed');
      return;
    }
    running.current = true;
    while (running.current) {
      const t0 = performance.now();
      try {
        let fb = await client.captureFrame(sid, await grabFrame(videoRef.current, 960, 0.85));
        if (fb.state === 'READY_FOR_STILL' && running.current) {
          setFeedback(fb);
          const still = await takeStill(streamRef.current, videoRef.current);
          fb = await client.captureStill(sid, still);
        }
        setFeedback(fb);
        onFrame?.(fb);
        if (fb.state === 'CAPTURED' || fb.state === 'EXPIRED') break;
      } catch (err) {
        // 404/409: the session closed or expired; anything else is shown and ends the loop.
        if (err.status !== 404 && err.status !== 409) setError(err);
        break;
      }
      const wait = 330 - (performance.now() - t0);
      if (wait > 0) await sleep(wait);
    }
    const stopped = !running.current;
    running.current = false;
    stopCamera();
    if (stopped) {
      setPhase('idle');
      return;
    }
    try {
      const result = await client.captureResult(sid, true);
      if (result.data?.capture_id) {
        setSelfie(b64ToDataUrl(result.data.selfie_base64));
        setCapture({ captureId: result.data.capture_id, selfieB64: result.data.selfie_base64, result });
        setPhase('done');
      } else {
        setPhase('failed');
      }
      onCaptured?.(result);
    } catch (err) {
      setError((e) => e || err);
      setPhase('failed');
    }
  }

  const hint = feedback?.primary_hint;
  const message =
    phase === 'done'
      ? t('Selfie captured ✓', 'سلفی گرفته شد ✓')
      : hint
        ? isFa ? hint.message_fa : hint.message_en
        : feedback?.state === 'READY_FOR_STILL'
          ? t('Great - hold still…', 'عالی - ثابت بمانید…')
          : phase === 'running'
            ? feedback ? t('Good, stay like this…', 'خوب است، همین‌طور بمانید…') : t('Starting the camera…', 'در حال روشن کردن دوربین…')
            : null;

  return (
    <div className="space-y-4">
      <div className={cx('relative mx-auto overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800', compact ? 'max-w-sm' : 'max-w-xl')}>
        <div className="aspect-[4/3]">
          <video ref={videoRef} playsInline muted className={cx('h-full w-full -scale-x-100 object-cover', !cameraOn && 'hidden')} />
          {selfie && !cameraOn && <img src={selfie} alt="" className="h-full w-full object-contain" />}
          {!cameraOn && !selfie && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-500">
              <Camera className="h-10 w-10" />
              <span className="text-sm">{t('Camera is off', 'دوربین خاموش است')}</span>
            </div>
          )}
        </div>
        {cameraOn && (
          <div
            className={cx(
              'pointer-events-none absolute left-1/2 top-[8%] h-[80%] w-[46%] -translate-x-1/2 rounded-[50%] border-[3px] border-dashed transition-colors',
              hint ? 'border-amber-300/80' : 'border-emerald-300/90',
            )}
          />
        )}
        {message && (
          <div className="absolute inset-x-3 top-3 rounded-xl bg-slate-950/80 px-4 py-2 text-center text-sm font-semibold text-white backdrop-blur">
            {message}
          </div>
        )}
        {feedback && cameraOn && (
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2">
            <Chip tone={STATE_TONE[feedback.state]} mono>
              {t(...STATE_TEXT[feedback.state])}
            </Chip>
            <Chip mono>
              {t('frames', 'فریم')} {feedback.frames_seen} · {Math.ceil(feedback.expires_in_s)}s
            </Chip>
          </div>
        )}
      </div>

      <ErrorBox error={error} />

      <div className="flex flex-wrap justify-center gap-2">
        {phase === 'running' ? (
          <Button variant="danger" icon={Square} onClick={() => (running.current = false)}>
            {t('Stop', 'توقف')}
          </Button>
        ) : (
          <Button icon={phase === 'idle' ? Camera : RotateCcw} onClick={run}>
            {phase === 'idle' ? t('Start camera & capture', 'روشن کردن دوربین و گرفتن سلفی') : t('Capture again', 'سلفی دوباره')}
          </Button>
        )}
      </div>
    </div>
  );
}
