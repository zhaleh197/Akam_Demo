import { useState } from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { go } from '../../lib/router';
import { b64ToDataUrl } from '../api';
import SelfieCapture from '../SelfieCapture';
import { Annotated, Button, Chip, Empty, JsonView, KeyValue, Notice, Panel, Reasons, ResultSummary } from '../ui';
import { metricRows } from './metrics';

const SEVERITY_TONE = { error: 'rose', warn: 'amber', info: 'cyan' };

export default function FaceCaptureDemo() {
  const { t, isFa } = useLang();
  const [frame, setFrame] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="space-y-6">
        <Panel title={t('Live capture session', 'جلسهٔ زندهٔ گرفتن سلفی')} subtitle={t('Face in the oval, plain background, good light.', 'صورت داخل بیضی، پس‌زمینهٔ ساده و نور کافی.')}>
          <SelfieCapture
            onFrame={setFrame}
            onCaptured={(r) => {
              setResult(r);
              setFrame(null);
            }}
          />
        </Panel>

        {result && (
          <>
            <ResultSummary result={result} title={t('Selfie capture', 'گرفتن سلفی')} />
            {result.data?.selfie_base64 && (
              <div className="grid gap-6 md:grid-cols-2">
                <Panel title={t('Captured selfie', 'سلفی گرفته‌شده')}>
                  <Annotated
                    src={b64ToDataUrl(result.data.selfie_base64)}
                    boxes={[{ box: result.data.face_box, tone: 'emerald' }]}
                    points={result.data.landmarks_5}
                  />
                </Panel>
                <Panel title={t('Session', 'جلسه')}>
                  <KeyValue
                    rows={[
                      ['capture_id', result.data.capture_id, true],
                      [t('Source', 'منبع'), result.data.source, true],
                      [t('Frames sent', 'فریم‌های ارسالی'), result.data.frames_seen, true],
                      [t('Stills rejected', 'عکس‌های ردشده'), result.data.stills_rejected, true],
                      ...metricRows(result.data.metrics, t),
                    ]}
                  />
                </Panel>
              </div>
            )}
            <Panel title={t('Reasons', 'دلایل')}>
              <Reasons reasons={result.reasons} emptyText={t('Captured with no warnings.', 'بدون هشدار گرفته شد.')} />
            </Panel>
            {result.data?.capture_id && (
              <Panel title={t('Use this selfie in', 'استفاده از این سلفی در')}>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['/kyc/face-match', t('Face Match', 'تطبیق چهره')],
                    ['/kyc/antispoof', t('Anti-Spoofing', 'تشخیص جعل')],
                    ['/kyc/liveness', t('Liveness', 'زنده بودن')],
                  ].map(([path, label]) => (
                    <Button key={path} variant="secondary" icon={ArrowRight} onClick={() => go(path)}>
                      {label}
                    </Button>
                  ))}
                </div>
              </Panel>
            )}
            <JsonView data={result} />
          </>
        )}
      </div>

      <div className="space-y-6">
        <Panel title={t('This frame', 'این فریم')} subtitle={t('What the server said about the last frame.', 'نظر سرور دربارهٔ آخرین فریم.')}>
          {frame ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {frame.hints.length === 0 && <Chip tone="emerald">{t('All checks pass', 'همهٔ بررسی‌ها قبول')}</Chip>}
                {frame.hints.map((h) => (
                  <Chip key={h.code} tone={SEVERITY_TONE[h.severity]} mono>
                    {h.code}
                  </Chip>
                ))}
              </div>
              {frame.primary_hint && (
                <Notice tone="warn">
                  <div className="font-medium">{isFa ? frame.primary_hint.message_fa : frame.primary_hint.message_en}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {t('Shown only once a problem repeats in 2 of the last 3 frames.', 'فقط وقتی نشان داده می‌شود که مشکل در ۲ فریم از ۳ فریم آخر تکرار شود.')}
                  </div>
                </Notice>
              )}
              {frame.metrics ? (
                <KeyValue rows={metricRows(frame.metrics, t)} />
              ) : (
                <p className="text-xs text-slate-500">
                  {t('Per-frame measurements are returned only when the server runs with KYC_DEBUG=true.', 'اندازه‌گیری‌های هر فریم فقط وقتی برمی‌گردد که سرور با KYC_DEBUG=true اجرا شود.')}
                </p>
              )}
            </div>
          ) : (
            <Empty icon={Camera}>{t('Start the camera to stream frames to the API.', 'دوربین را روشن کنید تا فریم‌ها به API ارسال شوند.')}</Empty>
          )}
        </Panel>
        <Panel title={t('How a session works', 'جلسه چطور کار می‌کند')}>
          <ol className="list-decimal space-y-2 ps-5 text-sm leading-relaxed text-slate-400">
            <li>{t('Frames (~3 per second) are checked; a single steady hint guides you.', 'فریم‌ها (حدود ۳ در ثانیه) بررسی می‌شوند و یک راهنمای پایدار هدایتتان می‌کند.')}</li>
            <li>{t('After 2 good frames in a row the stream qualifies (READY_FOR_STILL).', 'بعد از ۲ فریم خوب پشت سر هم، تصویر واجد شرایط می‌شود (READY_FOR_STILL).')}</li>
            <li>{t('A full-resolution still is taken; it must be as sharp and show the same person.', 'یک عکس با وضوح کامل گرفته می‌شود که باید به همان اندازه واضح و از همان شخص باشد.')}</li>
            <li>{t('The selfie stays on the server; you get a capture_id for the other modules.', 'سلفی روی سرور می‌ماند و یک capture_id برای ماژول‌های دیگر دریافت می‌کنید.')}</li>
          </ol>
        </Panel>
      </div>
    </div>
  );
}
