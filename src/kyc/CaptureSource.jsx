import { useEffect, useState } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { b64ToDataUrl } from './api';
import { CAPTURE_LIFETIME_MS, useKyc } from './KycContext';
import SelfieCapture from './SelfieCapture';
import { Button, Notice } from './ui';

// The probe for face match / anti-spoof / liveness: a selfie that came
// through a capture session (the API refuses uploaded selfies by design).
export default function CaptureSource() {
  const { capture, setCapture } = useKyc();
  const { t } = useLang();
  const [retake, setRetake] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  if (!capture || retake) {
    return (
      <div className="space-y-4">
        <Notice>
          {t(
            'This module works on a selfie captured through a live camera session - the API does not accept uploaded selfies, so a photo of a photo cannot be slipped in.',
            'این ماژول روی سلفی‌ای کار می‌کند که از یک جلسهٔ زندهٔ دوربین گرفته شده باشد؛ API سلفی آپلودی نمی‌پذیرد تا نتوان عکسِ عکس را جایگزین کرد.',
          )}
        </Notice>
        <SelfieCapture compact onCaptured={(r) => r.data?.capture_id && setRetake(false)} />
      </div>
    );
  }

  const left = Math.min(10, Math.max(0, Math.round((CAPTURE_LIFETIME_MS - (now - capture.at)) / 60000)));
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <img src={b64ToDataUrl(capture.selfieB64)} alt="" className="h-24 w-24 rounded-lg object-cover" />
      <div className="min-w-0 flex-1 space-y-1 text-sm">
        <div className="font-medium text-white">{t('Captured selfie', 'سلفی گرفته‌شده')}</div>
        <div dir="ltr" className="truncate font-mono text-xs text-slate-500 ltr:text-left rtl:text-right">
          capture_id: {capture.captureId}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {t(`Kept on the server for about ${left} more min`, `حدود ${left} دقیقهٔ دیگر روی سرور می‌ماند`)}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" icon={RefreshCw} className="px-3 py-1.5 text-xs" onClick={() => setRetake(true)}>
          {t('New selfie', 'سلفی جدید')}
        </Button>
        <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setCapture(null)}>
          {t('Forget', 'حذف')}
        </Button>
      </div>
    </div>
  );
}
