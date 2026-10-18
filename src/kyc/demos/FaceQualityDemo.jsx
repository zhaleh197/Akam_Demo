import { useState } from 'react';
import { Play, ScanFace } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { useKyc } from '../KycContext';
import { Annotated, Button, Empty, ErrorBox, ImageDrop, JsonView, KeyValue, Notice, Panel, Reasons, ResultSummary, Spinner } from '../ui';
import { useObjectUrl } from '../hooks';
import { metricRows } from './metrics';

export default function FaceQualityDemo() {
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
      setResult(await client.faceQualityCheck(file));
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
        <Panel title={t('Face photo', 'عکس چهره')} subtitle={t('Any single photo of a face. This check never produces a capture_id.', 'هر عکس تکی از چهره. این بررسی هرگز capture_id تولید نمی‌کند.')}>
          <div className="space-y-4">
            <ImageDrop file={file} onFile={setFile} capture="user" label={t('Choose a face photo', 'انتخاب عکس چهره')} />
            <Button icon={Play} loading={busy} disabled={!file} onClick={run} className="w-full">
              {t('Check quality', 'بررسی کیفیت')}
            </Button>
          </div>
        </Panel>
        <Notice>
          {t(
            'The same checks run on every camera frame in a selfie capture session. Thresholds are still provisional - they are being calibrated on phone cameras.',
            'همین بررسی‌ها در جلسهٔ گرفتن سلفی روی تک‌تک فریم‌های دوربین اجرا می‌شوند. آستانه‌ها هنوز موقت‌اند و روی دوربین گوشی کالیبره می‌شوند.',
          )}
        </Notice>
      </div>

      <div className="space-y-6">
        {error && <ErrorBox error={error} onRetry={run} />}
        {busy && <Spinner>{t('Detecting the face and measuring…', 'در حال تشخیص چهره و اندازه‌گیری…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={ScanFace}>{t('Upload a face photo to see the detected face, landmarks and every quality measurement.', 'یک عکس چهره آپلود کنید تا چهرهٔ تشخیص‌داده‌شده، نقاط کلیدی و همهٔ اندازه‌گیری‌های کیفیت را ببینید.')}</Empty>
          </Panel>
        )}
        {result && (
          <>
            <ResultSummary result={result} title={t('Face quality', 'کیفیت چهره')} />
            <div className="grid gap-6 md:grid-cols-2">
              <Panel title={t('Detection', 'تشخیص')}>
                <Annotated
                  src={preview}
                  boxes={d.face_box ? [{ box: d.face_box, tone: result.decision === 'pass' ? 'emerald' : 'amber' }] : []}
                  points={d.landmarks_5 || []}
                />
              </Panel>
              <Panel title={t('Measurements', 'اندازه‌گیری‌ها')}>
                <KeyValue rows={metricRows(d.metrics, t)} />
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
