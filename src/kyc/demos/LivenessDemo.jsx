import { useState } from 'react';
import { Fingerprint } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import CaptureSource from '../CaptureSource';
import { useKyc } from '../KycContext';
import LivenessRunner from '../LivenessRunner';
import { Empty, ErrorBox, JsonView, Panel, Spinner } from '../ui';
import LivenessResult from './LivenessResult';

export default function LivenessDemo() {
  const { client, capture } = useKyc();
  const { t } = useLang();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const start = async () => {
    setResult(null);
    const s = await client.livenessStart(capture.captureId);
    return { sessionId: s.session_id, tasks: s.tasks };
  };

  async function finish(sessionId) {
    setBusy(true);
    setError(null);
    try {
      setResult(await client.livenessResult(sessionId));
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
      <div className="space-y-6">
        <Panel title={t('1. Whose liveness', '۱. زنده بودن چه کسی')} subtitle={t('The session stays bound to this selfie: a different face mid-session fails it.', 'جلسه به این سلفی گره خورده است؛ اگر وسط جلسه چهرهٔ دیگری بیاید، رد می‌شود.')}>
          <CaptureSource />
        </Panel>
        <Panel title={t('2. Random movement challenges', '۲. چالش‌های حرکتی تصادفی')} subtitle={t('Look at the camera first, then follow each instruction.', 'ابتدا به دوربین نگاه کنید، سپس هر دستور را انجام دهید.')}>
          <LivenessRunner start={start} onDone={finish} disabled={!capture} />
        </Panel>
      </div>
      <div className="space-y-6">
        {error && <ErrorBox error={error} />}
        {busy && <Spinner>{t('Collecting the session result…', 'در حال دریافت نتیجهٔ جلسه…')}</Spinner>}
        {!busy && !result && !error && (
          <Panel>
            <Empty icon={Fingerprint}>{t('Finish a liveness session to see which tasks passed, how long each took, and the identity and anti-spoof checks on the video.', 'یک جلسهٔ زنده بودن را تمام کنید تا ببینید کدام حرکت‌ها قبول شد، هرکدام چقدر طول کشید و بررسی هویت و جعل روی ویدیو چه نتیجه‌ای داشت.')}</Empty>
          </Panel>
        )}
        {result && (
          <>
            <LivenessResult result={result} />
            <JsonView data={result} />
          </>
        )}
      </div>
    </div>
  );
}
