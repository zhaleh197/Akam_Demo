import { useState } from 'react';
import { Play, UserCheck } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { href } from '../../lib/router';
import { b64ToDataUrl } from '../api';
import CaptureSource from '../CaptureSource';
import { useKyc } from '../KycContext';
import { Button, Empty, ErrorBox, ImageDrop, JsonView, KeyValue, Panel, Reasons, ResultSummary, Spinner, ThresholdGauge } from '../ui';
import { cx } from '../../lib/cx';
import { useObjectUrl } from '../hooks';

export default function FaceMatchDemo() {
  const { client, capture, portrait } = useKyc();
  const { t } = useLang();
  const [source, setSource] = useState(portrait ? 'ocr' : 'upload');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const uploadUrl = useObjectUrl(file);

  const refUrl = source === 'ocr' ? b64ToDataUrl(portrait?.b64) : uploadUrl;
  const ready = capture && (source === 'ocr' ? portrait : file);

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      setResult(
        source === 'ocr'
          ? await client.faceMatchBase64(portrait.b64, capture.captureId)
          : await client.faceMatchFile(file, capture.captureId),
      );
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
        <Panel title={t('1. Reference: the card portrait', '۱. مرجع: عکس روی کارت')}>
          <div className="mb-4 inline-flex rounded-lg border border-slate-800 bg-slate-950 p-1 text-sm">
            {[
              ['ocr', t('From OCR', 'از OCR')],
              ['upload', t('Upload image', 'آپلود تصویر')],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSource(id)}
                className={cx('rounded-md px-3 py-1.5 transition-colors', source === id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white')}
              >
                {label}
              </button>
            ))}
          </div>
          {source === 'ocr' ? (
            portrait ? (
              <div className="flex items-center gap-4">
                <img src={refUrl} alt="" className="w-28 rounded-lg ring-1 ring-slate-700" />
                <p className="text-sm text-slate-400">{t('Portrait cropped by the OCR module from the card you read.', 'عکسی که ماژول OCR از کارت شما جدا کرده است.')}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                {t('No card read yet. ', 'هنوز کارتی خوانده نشده. ')}
                <a href={href('/kyc/ocr')} className="text-cyan-400 hover:underline">
                  {t('Read a card with OCR', 'خواندن کارت با OCR')}
                </a>
                {t(' or upload the portrait instead.', ' یا عکس را آپلود کنید.')}
              </p>
            )
          ) : (
            <ImageDrop file={file} onFile={setFile} label={t('Card portrait (or the whole card)', 'عکس کارت (یا کل کارت)')} />
          )}
        </Panel>

        <Panel title={t('2. Probe: a captured selfie', '۲. نمونه: سلفی گرفته‌شده')}>
          <CaptureSource />
        </Panel>

        <Button icon={Play} loading={busy} disabled={!ready} onClick={run} className="w-full py-3">
          {t('Compare faces', 'مقایسهٔ چهره‌ها')}
        </Button>
      </div>

      <div className="space-y-6">
        {error && <ErrorBox error={error} onRetry={run} />}
        {busy && <Spinner>{t('Embedding both faces with ArcFace…', 'استخراج بردار ویژگی هر دو چهره با ArcFace…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={UserCheck}>{t('Choose the card portrait, capture a selfie and compare to see the similarity against the decision thresholds.', 'عکس کارت را انتخاب کنید، سلفی بگیرید و مقایسه کنید تا شباهت را نسبت به آستانه‌های تصمیم ببینید.')}</Empty>
          </Panel>
        )}
        {result && (
          <>
            <ResultSummary result={result} title={t('Face match', 'تطبیق چهره')} />
            <Panel>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <figure className="space-y-2 text-center">
                  <img src={refUrl} alt="" className="aspect-[3/4] w-full rounded-xl bg-slate-950 object-contain" />
                  <figcaption className="text-xs text-slate-400">{t('Card portrait', 'عکس کارت')}</figcaption>
                </figure>
                <figure className="space-y-2 text-center">
                  <img src={b64ToDataUrl(capture?.selfieB64)} alt="" className="aspect-[3/4] w-full rounded-xl bg-slate-950 object-cover" />
                  <figcaption className="text-xs text-slate-400">{t('Selfie', 'سلفی')}</figcaption>
                </figure>
              </div>
              <ThresholdGauge
                value={d.similarity}
                rejectBelow={d.thresholds.reject_below}
                acceptAbove={d.thresholds.accept_above}
                label={t('Cosine similarity', 'شباهت کسینوسی')}
                caption={d.model}
              />
            </Panel>
            {d.reference_face && (
              <Panel title={t('Face found in the reference', 'چهرهٔ پیدا‌شده در مرجع')}>
                <KeyValue
                  rows={[
                    [t('Detector score', 'امتیاز آشکارساز'), d.reference_face.det_score, true],
                    [t('Face height (px)', 'ارتفاع چهره (پیکسل)'), d.reference_face.height_px, true],
                    [t('Faces found', 'تعداد چهره'), d.reference_face.faces_found, true],
                    [t('Rotation tried', 'چرخش اعمال‌شده'), `${d.reference_face.rotation}°`, true],
                  ]}
                />
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
