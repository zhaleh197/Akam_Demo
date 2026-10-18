import { useEffect, useState } from 'react';
import { ArrowRight, FileText, Play } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { go } from '../../lib/router';
import { b64ToDataUrl } from '../api';
import { useKyc } from '../KycContext';
import { Annotated, Button, Chip, Empty, ErrorBox, ImageDrop, JsonView, KeyValue, Notice, Panel, Reasons, ResultSummary, ScoreBar, Spinner } from '../ui';

const DERIVED = {
  national_id_valid: ['National code check digit', 'رقم کنترل کد ملی'],
  birth_date_gregorian: ['Birth date (Gregorian)', 'تاریخ تولد (میلادی)'],
  expiry_date_gregorian: ['Expiry date (Gregorian)', 'تاریخ انقضا (میلادی)'],
  age: ['Age', 'سن'],
  expired: ['Card expired', 'کارت منقضی'],
};

const QUALITY = {
  sharpness: ['Sharpness (Laplacian var.)', 'وضوح (واریانس لاپلاسین)'],
  brightness: ['Brightness (0-255)', 'روشنایی (۰ تا ۲۵۵)'],
  glare_ratio: ['Glare ratio', 'نسبت بازتاب نور'],
};

const fmt = (v) => (typeof v === 'boolean' ? (v ? '✓' : '✗') : typeof v === 'number' ? +v.toFixed(4) : v);

export default function OcrDemo() {
  const { client, setPortrait } = useKyc();
  const { t, pick } = useLang();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.ocrProfiles().then(setProfiles).catch(() => setProfiles([]));
  }, [client]);

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      setResult(await client.ocrDocument(file, { profile: profile || undefined }));
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  const data = result?.data;
  const fields = data ? Object.values(data.fields || {}) : [];
  const boxes = fields
    .filter((f) => f.box)
    .map((f) => ({
      box: f.box,
      label: f.key,
      tone: f.low_confidence ? 'amber' : f.value ? 'emerald' : 'rose',
      fill: true,
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="space-y-6">
        <Panel title={t('1. Card photo', '۱. عکس کارت')} subtitle={t('Front of the national card, whole card in frame, no direct glare.', 'روی کارت ملی، کل کارت در کادر و بدون بازتاب مستقیم نور.')}>
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-400">{t('Document type', 'نوع مدرک')}</span>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="">{t('Default (Iranian national card)', 'پیش‌فرض (کارت ملی ایران)')}</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {pick(p, 'name')} · {p.id}
                  </option>
                ))}
              </select>
            </label>
            <ImageDrop file={file} onFile={setFile} capture="environment" label={t('Choose the card photo', 'انتخاب عکس کارت')} />
            <Button icon={Play} loading={busy} disabled={!file} onClick={run} className="w-full">
              {busy ? t('Reading the card…', 'در حال خواندن کارت…') : t('Read the card', 'خواندن کارت')}
            </Button>
          </div>
        </Panel>

        {profiles[0] && (
          <Panel title={t('Fields this profile reads', 'فیلدهایی که این مدل می‌خواند')}>
            <div className="flex flex-wrap gap-2">
              {(profiles.find((p) => p.id === profile) || profiles[0]).fields.map((f) => (
                <Chip key={f.key} tone={f.required ? 'cyan' : 'slate'}>
                  {pick(f, 'label')}
                  <span dir="ltr" className="font-mono text-[10px] opacity-60">{f.kind}</span>
                </Chip>
              ))}
            </div>
          </Panel>
        )}
      </div>

      <div className="space-y-6">
        {error && <ErrorBox error={error} onRetry={run} />}
        {busy && <Spinner>{t('Detecting fields and reading text - easyocr on CPU takes a few seconds…', 'تشخیص فیلدها و خواندن متن - easyocr روی CPU چند ثانیه طول می‌کشد…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={FileText}>{t('Upload a card photo and run the module to see the extracted fields, validation and portrait here.', 'عکس کارت را آپلود و ماژول را اجرا کنید تا فیلدهای استخراج‌شده، اعتبارسنجی و عکس کارت اینجا نمایش داده شود.')}</Empty>
          </Panel>
        )}

        {result && (
          <>
            <ResultSummary result={result} title={t('Document OCR', 'خواندن کارت')} />

            {fields.length === 0 && (
              <Notice tone="err">
                {t(
                  'No field was read: the photo was stopped before recognition. See the reasons below and the quality measurements.',
                  'هیچ فیلدی خوانده نشد: عکس پیش از خواندن متن متوقف شد. دلایل و اندازه‌گیری‌های کیفیت را در پایین ببینید.',
                )}
              </Notice>
            )}

            {fields.length > 0 && (
            <Panel title={t('Extracted fields', 'فیلدهای استخراج‌شده')} padded={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr className="border-b border-slate-800">
                      <th className="px-5 py-3 text-start font-medium">{t('Field', 'فیلد')}</th>
                      <th className="px-3 py-3 text-start font-medium">{t('Value', 'مقدار')}</th>
                      <th className="px-3 py-3 text-start font-medium">{t('Raw recognition', 'خروجی خام')}</th>
                      <th className="w-32 px-5 py-3 text-start font-medium">{t('Confidence', 'اطمینان')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {fields.map((f) => (
                      <tr key={f.key} className={f.low_confidence ? 'bg-amber-500/5' : ''}>
                        <td className="px-5 py-3 text-slate-400">
                          {pick(f, 'label')}
                          <div dir="ltr" className="font-mono text-[10px] text-slate-600 ltr:text-left rtl:text-right">{f.backend}</div>
                        </td>
                        <td className="px-3 py-3 font-semibold text-white">
                          {f.value || <span className="font-normal text-rose-300">{t('not read', 'خوانده نشد')}</span>}
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-slate-500">{f.raw || '—'}</td>
                        <td className="px-5 py-3">
                          <ScoreBar value={f.confidence} label=" " />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {data.card_base64 && fields.length > 0 && (
                <Panel title={t('Detected fields on the card', 'فیلدهای تشخیص‌داده‌شده روی کارت')} className="md:col-span-2">
                  <Annotated src={b64ToDataUrl(data.card_base64)} boxes={boxes} />
                  {data.orientation && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <Chip mono>rotation {data.orientation.rotation}°</Chip>
                      <Chip mono>deskew {data.orientation.deskew_deg}°</Chip>
                      <Chip mono>layout {data.orientation.layout_score}</Chip>
                    </div>
                  )}
                </Panel>
              )}

              {data.portrait_base64 && (
                <Panel title={t('Card portrait', 'عکس روی کارت')}>
                  <div className="flex items-start gap-4">
                    <img src={b64ToDataUrl(data.portrait_base64)} alt="" className="w-28 rounded-lg ring-1 ring-slate-700" />
                    <div className="space-y-3 text-sm text-slate-400">
                      <p>{t('This crop is the reference for face matching.', 'این برش، مرجع تطبیق چهره است.')}</p>
                      <Button
                        variant="secondary"
                        icon={ArrowRight}
                        className="text-xs"
                        onClick={() => {
                          setPortrait({ b64: data.portrait_base64, source: 'ocr' });
                          go('/kyc/face-match');
                        }}
                      >
                        {t('Use in Face Match', 'استفاده در تطبیق چهره')}
                      </Button>
                    </div>
                  </div>
                </Panel>
              )}

              <Panel title={t('Validation & derived values', 'اعتبارسنجی و مقادیر محاسبه‌شده')}>
                {Object.keys(data.derived || {}).length ? (
                  <KeyValue rows={Object.entries(data.derived).map(([k, v]) => [DERIVED[k] ? t(...DERIVED[k]) : k, fmt(v), true])} />
                ) : (
                  <p className="text-sm text-slate-500">{t('Nothing to validate - no values were read.', 'مقداری خوانده نشد که اعتبارسنجی شود.')}</p>
                )}
                {data.missing_fields?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {data.missing_fields.map((k) => (
                      <Chip key={k} tone="rose" mono>{k}</Chip>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel title={t('Image quality gate', 'دروازهٔ کیفیت تصویر')}>
                <KeyValue
                  rows={[
                    ...Object.entries(data.quality || {}).map(([k, v]) => [QUALITY[k] ? t(...QUALITY[k]) : k, fmt(v), true]),
                    [t('Photo size', 'اندازهٔ عکس'), data.source_size?.join(' × '), true],
                  ]}
                />
              </Panel>
            </div>

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
