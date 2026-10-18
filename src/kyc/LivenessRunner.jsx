import { useEffect, useRef, useState } from 'react';
import { Check, Fingerprint, Play, Square } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { grabFrame, sleep, useCamera } from './camera';
import { useKyc } from './KycContext';
import { TASK_TEXT } from './texts';
import { Button, Chip, ErrorBox } from './ui';
import { cx } from '../lib/cx';

const HINT_EN = {
  no_face: ['Keep your face in the frame'],
  multiple_faces: ['Only you should be in the frame'],
};

// One liveness session: `start()` resolves to {sessionId, tasks}; frames are
// streamed until the server reports VERIFIED / FAILED / EXPIRED, then
// `onDone(sessionId)` is called.
export default function LivenessRunner({ start, onDone, disabled }) {
  const { client } = useKyc();
  const { t, isFa } = useLang();
  const { videoRef, start: startCamera, stop: stopCamera, active: cameraOn } = useCamera();
  const running = useRef(false);
  const [tasks, setTasks] = useState(null);
  const [fb, setFb] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => (running.current = false), []);

  async function run() {
    setError(null);
    setFb(null);
    setBusy(true);
    let session;
    try {
      session = await start();
      setTasks(session.tasks);
      await startCamera(1280);
    } catch (err) {
      stopCamera();
      setError(err);
      setBusy(false);
      return;
    }
    running.current = true;
    let last = { state: 'BASELINE' };
    while (running.current && (last.state === 'BASELINE' || last.state === 'RUNNING')) {
      const t0 = performance.now();
      try {
        last = await client.livenessFrame(session.sessionId, await grabFrame(videoRef.current, 960, 0.85));
        setFb(last);
      } catch (err) {
        if (err.status !== 404 && err.status !== 409) setError(err);
        break;
      }
      const wait = 150 - (performance.now() - t0);
      if (wait > 0) await sleep(wait);
    }
    const stopped = !running.current;
    running.current = false;
    stopCamera();
    setBusy(false);
    if (!stopped) onDone(session.sessionId);
  }

  // Frame hints come in Persian only; English text is kept here.
  const hintText = fb?.hint && (isFa ? fb.hint.message_fa : t(...(HINT_EN[fb.hint.code] || [fb.hint.message_fa])));
  const instruction = hintText || (isFa ? fb?.instruction_fa : fb?.instruction_en);
  const remaining = fb?.time_remaining_s;

  return (
    <div className="space-y-4">
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800">
        <div className="aspect-[4/3]">
          <video ref={videoRef} playsInline muted className={cx('h-full w-full -scale-x-100 object-cover', !cameraOn && 'hidden')} />
          {!cameraOn && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-500">
              <Fingerprint className="h-10 w-10" />
              <span className="text-sm">
                {fb && !busy ? t('Session finished', 'جلسه تمام شد') : t('Camera is off', 'دوربین خاموش است')}
              </span>
            </div>
          )}
        </div>
        {cameraOn && <div className="pointer-events-none absolute left-1/2 top-[8%] h-[80%] w-[46%] -translate-x-1/2 rounded-[50%] border-[3px] border-dashed border-white/60" />}
        {cameraOn && instruction && (
          <div className="absolute inset-x-3 top-3 rounded-xl bg-slate-950/85 px-4 py-3 text-center backdrop-blur">
            <div className="text-lg font-bold text-white">{instruction}</div>
            {remaining != null && (
              <div className="mx-auto mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-400 transition-all duration-150" style={{ width: `${Math.min(100, (remaining / 8) * 100)}%` }} />
              </div>
            )}
          </div>
        )}
        {cameraOn && fb?.measure && (
          <div dir="ltr" className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <Chip mono>yaw {fb.measure.yaw}°</Chip>
            <Chip mono>eyes {fb.measure.eyes}</Chip>
            <Chip mono>mouth {fb.measure.mouth}</Chip>
          </div>
        )}
      </div>

      {tasks && (
        <div className="flex flex-wrap justify-center gap-2">
          {tasks.map((task, i) => {
            const done = fb && (i < fb.task_index || fb.state === 'VERIFIED');
            const now = fb?.state === 'RUNNING' && i === fb.task_index;
            return (
              <span
                key={`${task.task}-${i}`}
                className={cx(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  done ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200' : now ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100' : 'border-slate-700 text-slate-400',
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : <span className="font-mono">{i + 1}</span>}
                {t(...(TASK_TEXT[task.task] || [task.task, task.task]))}
              </span>
            );
          })}
        </div>
      )}

      <ErrorBox error={error} />

      <div className="flex justify-center">
        {busy ? (
          <Button variant="danger" icon={Square} onClick={() => (running.current = false)}>
            {t('Stop', 'توقف')}
          </Button>
        ) : (
          <Button icon={Play} onClick={run} disabled={disabled}>
            {fb ? t('Run liveness again', 'اجرای دوبارهٔ زنده بودن') : t('Start liveness check', 'شروع بررسی زنده بودن')}
          </Button>
        )}
      </div>
    </div>
  );
}
