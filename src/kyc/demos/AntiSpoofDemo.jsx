import { useState } from 'react';
import { Play, ShieldCheck } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { b64ToDataUrl } from '../api';
import CaptureSource from '../CaptureSource';
import { useKyc } from '../KycContext';
import { Button, Empty, ErrorBox, JsonView, KeyValue, Notice, Panel, Reasons, ResultSummary, ScoreBar, Spinner, ThresholdGauge } from '../ui';

export default function AntiSpoofDemo() {
  const { client, capture } = useKyc();
  const { t } = useLang();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      setResult(await client.antispoof(capture.captureId));
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  const d = result?.data;
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="space-y-6">
        <Panel title={t('Selfie to check', 'سلفی برای بررسی')}>
          <CaptureSource />
        </Panel>
        <Button icon={Play} loading={busy} disabled={!capture} onClick={run} className="w-full py-3">
          {t('Check for a spoof', 'بررسی جعل')}
        </Button>
        <Notice>
          {t(
            'Try it: capture a selfie of a printed photo or of a face on another screen, then run the check again.',
            'امتحان کنید: از یک عکس چاپی یا چهره‌ای روی صفحهٔ دیگر سلفی بگیرید و دوباره بررسی کنید.',
          )}
        </Notice>
      </div>

      <div className="space-y-6">
        {error && <ErrorBox error={error} onRetry={run} />}
        {busy && <Spinner>{t('Scoring the face with MiniFASNet…', 'امتیازدهی چهره با MiniFASNet…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={ShieldCheck}>{t('Capture a selfie and run the check to see the live score and each model’s vote.', 'سلفی بگیرید و بررسی را اجرا کنید تا امتیاز زنده بودن و رأی هر مدل را ببینید.')}</Empty>
          </Panel>
        )}
        {result && (
          <>
            <ResultSummary result={result} title={t('Anti-spoofing', 'تشخیص جعل')} />
            <Panel>
              <div className="flex flex-col gap-6 sm:flex-row">
                <img src={b64ToDataUrl(capture?.selfieB64)} alt="" className="h-40 w-40 shrink-0 rounded-xl object-cover" />
                <div className="flex-1">
                  {d.retake ? (
                    <Notice tone="warn">
                      {t(
                        `The selfie is too blurry to judge (sharpness ${d.sharpness?.toFixed(2)}, needs ${d.min_sharpness}). This is a "retake", not a spoof verdict.`,
                        `سلفی برای قضاوت خیلی تار است (وضوح ${d.sharpness?.toFixed(2)}، حداقل ${d.min_sharpness}). نتیجه «عکس دوباره» است، نه جعل.`,
                      )}
                    </Notice>
                  ) : (
                    <ThresholdGauge
                      value={d.live_score}
                      rejectBelow={d.thresholds.reject_below}
                      acceptAbove={d.thresholds.accept_above}
                      label={t('Live score - P(real face)', 'امتیاز زنده بودن - احتمال چهرهٔ واقعی')}
                    />
                  )}
                </div>
              </div>
            </Panel>
            {!d.retake && d.models && (
              <Panel title={t('Per model', 'به تفکیک مدل')}>
                <div className="space-y-4">
                  {d.models.map((m) => (
                    <div key={m.name}>
                      <ScoreBar value={m.live_score} label={`${m.name} · ${m.context_scale}×`} format={(v) => v.toFixed(3)} />
                      <div dir="ltr" className="mt-1 font-mono text-[11px] text-slate-500 ltr:text-left rtl:text-right">
                        min {m.live_score_min}
                        {m.context_clamped ? ' · context clamped' : ''}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <KeyValue rows={[[t('Jittered face boxes averaged', 'تعداد برش‌های جابه‌جاشده'), d.jitter_boxes, true]]} />
                </div>
              </Panel>
            )}
            <Panel title={t('Reasons', 'دلایل')}>
              <Reasons reasons={result.reasons} />
            </Panel>
            <JsonView data={result} />
          </>
        )}
      </div>
    </div>
  );
}
