import { useState } from 'react';
import { FileSearch, Play } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { useKyc } from '../KycContext';
import { Annotated, Button, Chip, Empty, ErrorBox, ImageDrop, JsonView, Notice, Panel, Reasons, ResultSummary, Spinner } from '../ui';
import { cx } from '../../lib/cx';
import { useObjectUrl } from '../hooks';

const REGION = {
  portrait: ['Portrait', 'عکس'],
  national_id: ['National code', 'کد ملی'],
  birth_date: ['Birth date', 'تاریخ تولد'],
  expiry_date: ['Expiry date', 'تاریخ انقضا'],
};

// score is relative to the calibrated limit: 1.0 = exactly at the warning line.
function LimitBar({ score }) {
  const pct = Math.min(100, (score / 2) * 100);
  return (
    <div dir="ltr" className="relative h-2 rounded-full bg-slate-800">
      <div className={cx('h-full rounded-full', score >= 1 ? 'bg-amber-400' : 'bg-emerald-400')} style={{ width: `${pct}%` }} />
      <div className="absolute -top-1 left-1/2 h-4 w-px bg-slate-400" title="limit" />
    </div>
  );
}

export default function ForensicsDemo() {
  const { client } = useKyc();
  const { t } = useLang();
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const preview = useObjectUrl(file);

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      setResult(await client.forensics(file));
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  const signals = result?.data?.signals || [];
  const regionName = (n) => (REGION[n] ? t(...REGION[n]) : n);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="space-y-6">
        <Panel title={t('Card photo, as captured', 'عکس کارت، همان‌طور که گرفته شده')} subtitle={t('Not a screenshot or a re-saved copy - re-saving erases the traces this module looks for.', 'نه اسکرین‌شات و نه نسخهٔ دوباره ذخیره‌شده؛ ذخیرهٔ دوباره ردهایی را که این ماژول دنبالش است پاک می‌کند.')}>
          <div className="space-y-4">
            <ImageDrop file={file} onFile={setFile} capture="environment" label={t('Choose the card photo', 'انتخاب عکس کارت')} />
            <Button icon={Play} loading={busy} disabled={!file} onClick={run} className="w-full">
              {t('Analyse the card', 'تحلیل کارت')}
            </Button>
          </div>
        </Panel>
        <Notice>
          {t(
            'The card is read by OCR first, so its detector can locate the regions. Forensics is advisory: a signal sends a case to manual review and never rejects it on its own.',
            'ابتدا کارت با OCR خوانده می‌شود تا آشکارساز آن ناحیه‌ها را پیدا کند. جرم‌شناسی مشورتی است: یک نشانه پرونده را به بررسی دستی می‌فرستد و به‌تنهایی رد نمی‌کند.',
          )}
        </Notice>
      </div>

      <div className="space-y-6">
        {error && <ErrorBox error={error} onRetry={run} />}
        {busy && <Spinner>{t('Reading the card, then analysing its pixels…', 'خواندن کارت و سپس تحلیل پیکسل‌ها…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={FileSearch}>{t('Upload a card photo to see each region compared with what a genuine card looks like.', 'عکس کارت را آپلود کنید تا هر ناحیه با یک کارت اصل مقایسه شود.')}</Empty>
          </Panel>
        )}
        {result && (
          <>
            <ResultSummary result={result} title={t('Document forensics', 'جرم‌شناسی سند')} />
            {signals.length > 0 && (
              <Panel title={t('Regions checked', 'ناحیه‌های بررسی‌شده')}>
                <Annotated
                  src={preview}
                  boxes={signals.map((s) => ({ box: s.region, label: s.name, tone: s.score >= 1 ? 'amber' : 'emerald', fill: true }))}
                />
              </Panel>
            )}
            <Panel title={t('Signals', 'نشانه‌ها')} subtitle={t('Each bar is relative to its calibrated limit (the centre line).', 'هر نوار نسبت به حد کالیبره‌شدهٔ خودش است (خط وسط).')}>
              {signals.length === 0 ? (
                <p className="text-sm text-slate-400">{t('No pixel checks ran - see the reasons below.', 'هیچ بررسی پیکسلی انجام نشد؛ دلایل زیر را ببینید.')}</p>
              ) : (
                <ul className="space-y-4">
                  {signals.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{regionName(s.name)}</span>
                        <span dir="ltr" className="font-mono text-xs text-slate-400">
                          {s.score.toFixed(2)}× · {s.feature}
                        </span>
                      </div>
                      <LimitBar score={s.score} />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.entries(s.deviations || {}).map(([k, v]) => (
                          <Chip key={k} mono tone={v >= 1 ? 'amber' : 'slate'}>
                            {k} {v}
                          </Chip>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {result.data.calibration_version && (
                <div dir="ltr" className="mt-4 font-mono text-[11px] text-slate-500 ltr:text-left rtl:text-right">
                  calibration {result.data.calibration_version}
                </div>
              )}
            </Panel>
            <Panel title={t('Reasons', 'دلایل')}>
              <Reasons reasons={result.reasons} emptyText={t('Nothing unusual found.', 'مورد غیرعادی پیدا نشد.')} />
            </Panel>
            <JsonView data={result} />
          </>
        )}
      </div>
    </div>
  );
}
