import { useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, FolderPlus, Gavel, Play, RotateCcw, XCircle } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { useKyc } from '../KycContext';
import LivenessRunner from '../LivenessRunner';
import SelfieCapture from '../SelfieCapture';
import { Button, DecisionBadge, ErrorBox, ImageDrop, JsonView, KeyValue, Notice, Panel, Spinner, ThresholdGauge } from '../ui';
import { cx } from '../../lib/cx';

const STEP_LABEL = {
  document: ['ID card (OCR)', 'کارت ملی (OCR)'],
  forensics: ['Document forensics', 'جرم‌شناسی سند'],
  selfie: ['Selfie quality', 'کیفیت سلفی'],
  antispoof: ['Anti-spoofing', 'تشخیص جعل'],
  face_match: ['Face match with card', 'تطبیق چهره با کارت'],
  liveness: ['Liveness', 'زنده بودن'],
};

const VERDICT = {
  approved: ['Identity verified', 'احراز هویت تأیید شد', 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200', CheckCircle2],
  manual_review: ['Sent to manual review', 'برای بررسی دستی ارسال شد', 'border-amber-500/40 bg-amber-500/10 text-amber-200', AlertTriangle],
  rejected: ['Verification rejected', 'احراز هویت رد شد', 'border-rose-500/40 bg-rose-500/10 text-rose-200', XCircle],
};

const WIZARD = [
  ['Open case', 'باز کردن پرونده'],
  ['ID card', 'کارت ملی'],
  ['Selfie', 'سلفی'],
  ['Liveness', 'زنده بودن'],
  ['Verdict', 'نتیجه'],
];

export default function CaseDemo() {
  const { client } = useKyc();
  const { t, pick } = useLang();
  const [step, setStep] = useState(0);
  const [kase, setKase] = useState(null);
  const [card, setCard] = useState(null);
  const [ocr, setOcr] = useState(null);
  const [match, setMatch] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const guard = async (fn) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  const open = () =>
    guard(async () => {
      setKase(await client.caseCreate());
      setStep(1);
    });

  const readCard = () =>
    guard(async () => {
      setOcr(null);
      setOcr(await client.caseDocument(kase.case_id, card));
    });

  const onSelfie = (result) => {
    if (!result.data?.capture_id) return;
    guard(async () => setMatch(await client.caseFaceMatch(kase.case_id)));
  };

  const finalize = () =>
    guard(async () => {
      setStep(4);
      setVerdict(await client.caseFinalize(kase.case_id));
    });

  const reset = () => {
    setStep(0);
    setKase(null);
    setCard(null);
    setOcr(null);
    setMatch(null);
    setVerdict(null);
    setError(null);
  };

  const fields = ocr ? Object.values(ocr.data.fields || {}) : [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <ol className="grid grid-cols-5 gap-2">
        {WIZARD.map((w, i) => (
          <li key={i} className="space-y-2 text-center">
            <div className={cx('h-1.5 rounded-full', i < step ? 'bg-cyan-500' : i === step ? 'bg-cyan-400/60' : 'bg-slate-800')} />
            <div className={cx('text-xs', i <= step ? 'text-slate-200' : 'text-slate-500')}>{t(...w)}</div>
          </li>
        ))}
      </ol>

      {error && <ErrorBox error={error} />}

      {step === 0 && (
        <Panel title={t('One case, every module', 'یک پرونده، همهٔ ماژول‌ها')}>
          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              {t(
                'This runs the whole verification exactly as a client app would integrate it: the case keeps each step’s result, and finalize combines them by policy into one verdict.',
                'این بخش کل فرایند احراز هویت را دقیقاً همان‌طور که یک اپلیکیشن مشتری پیاده‌سازی می‌کند اجرا می‌کند: پرونده نتیجهٔ هر مرحله را نگه می‌دارد و در پایان طبق سیاست، یک نتیجهٔ نهایی می‌دهد.',
              )}
            </p>
            <Button icon={FolderPlus} loading={busy} onClick={open}>
              {t('Open a verification case', 'باز کردن پروندهٔ احراز هویت')}
            </Button>
          </div>
        </Panel>
      )}

      {kase && step < 4 && (
        <div dir="ltr" className="font-mono text-xs text-slate-500 ltr:text-left rtl:text-right">
          case_id {kase.case_id} · policy {kase.policy_version}
        </div>
      )}

      {step === 1 && (
        <Panel title={t('1. Photo of the ID card', '۱. عکس کارت ملی')}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <ImageDrop file={card} onFile={setCard} capture="environment" />
              <Button icon={Play} loading={busy} disabled={!card} onClick={readCard} className="w-full">
                {t('Read the card', 'خواندن کارت')}
              </Button>
            </div>
            <div>
              {busy && !ocr && <Spinner>{t('Reading the card…', 'در حال خواندن کارت…')}</Spinner>}
              {ocr && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DecisionBadge decision={ocr.decision} />
                    {ocr.data.derived?.national_id_valid && (
                      <span className="text-xs text-emerald-300">{t('National code is valid ✓', 'کد ملی معتبر است ✓')}</span>
                    )}
                  </div>
                  <KeyValue rows={fields.map((f) => [pick(f, 'label'), f.value || t('not read', 'خوانده نشد')])} />
                  {ocr.reasons.filter((r) => r.severity !== 'info').map((r, i) => (
                    <Notice key={i} tone={r.severity === 'error' ? 'err' : 'warn'}>{pick(r)}</Notice>
                  ))}
                  <Button icon={ArrowRight} onClick={() => setStep(2)} disabled={!ocr.data.portrait_base64 && ocr.decision === 'fail'} className="w-full">
                    {t('Continue to selfie', 'ادامه به سلفی')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Panel>
      )}

      {step === 2 && (
        <Panel title={t('2. Selfie', '۲. سلفی')} subtitle={t('Matched against the card portrait as soon as it is captured.', 'بلافاصله پس از گرفتن، با عکس کارت مقایسه می‌شود.')}>
          <div className="grid gap-6 md:grid-cols-2">
            <SelfieCapture compact startSession={async () => (await client.caseCapture(kase.case_id)).capture_session_id} onCaptured={onSelfie} />
            <div className="space-y-4">
              {busy && <Spinner>{t('Comparing with the card…', 'در حال مقایسه با کارت…')}</Spinner>}
              {match && (
                <>
                  <ThresholdGauge
                    value={match.data.similarity}
                    rejectBelow={match.data.thresholds.reject_below}
                    acceptAbove={match.data.thresholds.accept_above}
                    label={t('Face match similarity', 'شباهت چهره با کارت')}
                  />
                  <DecisionBadge decision={match.decision} />
                  <Button icon={ArrowRight} onClick={() => setStep(kase.require_liveness ? 3 : 4)} className="w-full">
                    {t('Continue', 'ادامه')}
                  </Button>
                  {!kase.require_liveness && (
                    <Button variant="secondary" onClick={() => setStep(3)} className="w-full">
                      {t('Also run liveness', 'اجرای زنده بودن هم')}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </Panel>
      )}

      {step === 3 && (
        <Panel title={t('3. Liveness', '۳. زنده بودن')}>
          <LivenessRunner
            start={async () => {
              const s = await client.caseLiveness(kase.case_id);
              return { sessionId: s.liveness_session_id, tasks: s.tasks };
            }}
            onDone={finalize}
          />
        </Panel>
      )}

      {step === 4 && !verdict && busy && <Spinner>{t('Combining every step into the verdict…', 'جمع‌بندی همهٔ مراحل در نتیجهٔ نهایی…')}</Spinner>}
      {step === 4 && !verdict && !busy && (
        <Button icon={Gavel} onClick={finalize}>{t('Get the verdict', 'دریافت نتیجه')}</Button>
      )}

      {verdict && (
        <>
          <div className={cx('flex flex-col items-center gap-2 rounded-2xl border px-6 py-8 text-center', VERDICT[verdict.verdict][2])}>
            {(() => {
              const Icon = VERDICT[verdict.verdict][3];
              return <Icon className="h-10 w-10" />;
            })()}
            <div className="text-2xl font-bold">{t(VERDICT[verdict.verdict][0], VERDICT[verdict.verdict][1])}</div>
            <div dir="ltr" className="font-mono text-xs opacity-70">
              {verdict.case_id} · policy {verdict.policy_version} · review score {verdict.review_score}
            </div>
          </div>

          <Panel title={t('Step by step', 'مرحله به مرحله')} padded={false}>
            <ul className="divide-y divide-slate-800">
              {Object.keys(STEP_LABEL).map((s) => {
                const st = verdict.steps[s] || { status: 'not_run' };
                const why = verdict.blocking_reasons.filter((b) => b.step === s);
                return (
                  <li key={s} className="flex items-start justify-between gap-4 px-5 py-4">
                    <div>
                      <div className="font-medium text-white">{t(...STEP_LABEL[s])}</div>
                      {st.score != null && (
                        <div dir="ltr" className="font-mono text-xs text-slate-500 ltr:text-left rtl:text-right">score {st.score.toFixed(3)}</div>
                      )}
                      {why.map((b, i) => (
                        <div key={i} className="mt-1 text-sm text-amber-300">• {pick(b)}</div>
                      ))}
                    </div>
                    {st.status === 'done' ? (
                      <DecisionBadge decision={st.decision} />
                    ) : (
                      <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-400">
                        {st.status === 'not_run' ? t('Not run', 'اجرا نشد') : t('Unavailable', 'در دسترس نبود')}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title={t('Identity data on the verdict', 'اطلاعات هویتی در نتیجه')}>
            <KeyValue rows={[...Object.entries(verdict.values || {}), ...Object.entries(verdict.derived || {}).map(([k, v]) => [k, String(v), true])]} />
          </Panel>

          <JsonView data={verdict} />
          <Button variant="secondary" icon={RotateCcw} onClick={reset}>
            {t('Start a new case', 'پروندهٔ جدید')}
          </Button>
        </>
      )}
    </div>
  );
}
