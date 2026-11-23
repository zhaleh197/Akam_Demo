import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { cx } from '../lib/cx';
import { useKyc } from './KycContext';
import { Button, Chip, Notice, Panel } from './ui';

// Labels for the server's check groups (CHECK_GROUPS in the kyc project,
// kyc/modules/face_capture/quality.py). A group the site does not know yet
// is shown by its id.
const LABELS = {
  distance: ['Face distance and position', 'فاصله و قرارگیری صورت'],
  lighting: ['Enough light (not too dark or bright)', 'نور کافی (نه تاریک، نه خیلی روشن)'],
  even_lighting: ['Even light on the face', 'نور یکنواخت روی صورت'],
  sharpness: ['Sharpness (not blurry)', 'وضوح (تار نبودن)'],
  no_cover: ['Face not covered (mask, hand, sunglasses)', 'پوشش صورت (ماسک، دست، عینک آفتابی)'],
  eyes_open: ['Eyes open', 'چشم باز'],
  mouth_closed: ['Mouth closed', 'دهان بسته'],
  gaze: ['Looking at the camera', 'نگاه مستقیم به دوربین'],
  head_pose: ['Head straight and facing forward', 'زاویهٔ سر (صاف و رو به جلو)'],
  background: ['Plain background', 'پس‌زمینهٔ یکدست'],
  single_person: ['Only one person in the frame', 'فقط یک نفر در کادر'],
};

const MODES = [
  ['block', ['Block', 'جلوگیری'], 'border-rose-500/50 bg-rose-500/15 text-rose-100'],
  ['info', ['Hint only', 'فقط پیام'], 'border-amber-500/50 bg-amber-500/15 text-amber-100'],
  ['off', ['Off', 'خاموش'], 'border-slate-500 bg-slate-700/60 text-slate-100'],
];

// Test menu: which selfie checks run in this browser's capture sessions and
// single-image checks. The server applies it only when started with
// KYC_DEBUG=true; a real deployment always runs every check.
export default function ChecksPanel({ collapsible = false }) {
  const { serverChecks, checkChoice, checkModes, setCheckChoice, health } = useKyc();
  const { t } = useLang();
  const [open, setOpen] = useState(!collapsible);

  const groups = serverChecks ? Object.keys(serverChecks.groups) : Object.keys(LABELS);
  const serverMode = (g) => serverChecks?.modes[g] ?? 'block';
  const modeOf = (g) => checkChoice[g] ?? serverMode(g);
  const changed = groups.filter((g) => modeOf(g) !== serverMode(g));
  const adjustable = Boolean(serverChecks?.adjustable);

  const choose = (g, m) => {
    const next = { ...checkChoice };
    if (m === serverMode(g)) delete next[g];
    else next[g] = m;
    setCheckChoice(next);
  };
  const setAll = (m) => setCheckChoice(m ? Object.fromEntries(groups.map((g) => [g, m])) : {});

  return (
    <Panel
      title={
        <button
          type="button"
          onClick={() => collapsible && setOpen((o) => !o)}
          className={cx('flex items-center gap-2', collapsible && 'hover:text-cyan-300')}
          aria-expanded={open}
        >
          <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
          {t('Selfie checks (testing)', 'بررسی‌های سلفی (برای تست)')}
          {collapsible && <ChevronDown className={cx('h-4 w-4 text-slate-500 transition-transform', open && 'rotate-180')} />}
        </button>
      }
      subtitle={t(
        'Choose which checks block the capture. For testing only: a real deployment runs all of them.',
        'انتخاب کنید کدام بررسی‌ها جلوی گرفتن سلفی را بگیرند. فقط برای تست است؛ در نسخهٔ واقعی همهٔ بررسی‌ها انجام می‌شوند.',
      )}
      actions={
        changed.length > 0 ? (
          <Chip tone={adjustable ? 'amber' : 'rose'}>
            {t(`${changed.length} changed`, `${changed.length} مورد تغییر کرده`)}
            {!adjustable && t(' (not applied)', ' (اعمال نمی‌شود)')}
          </Chip>
        ) : (
          <Chip tone="emerald">{t('All checks as on the server', 'همهٔ بررسی‌ها مثل تنظیم سرور')}</Chip>
        )
      }
    >
      {open && (
        <div className="space-y-4">
          {health.state === 'ok' && serverChecks && !adjustable && (
            <Notice tone="warn">
              {t(
                'This server does not accept changes to the checks, so every check still runs. To test with checks off, restart the server with KYC_DEBUG=true:',
                'این سرور تغییر بررسی‌ها را نمی‌پذیرد، پس همهٔ بررسی‌ها همچنان انجام می‌شوند. برای تست با بررسی‌های خاموش، سرور را با KYC_DEBUG=true دوباره اجرا کنید:',
              )}
              <pre dir="ltr" className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs text-slate-300">
                {'cd E:\\1405\\kyc\n$env:KYC_DEBUG="true"; .venv\\Scripts\\python -m uvicorn kyc.api.app:app --port 8000'}
              </pre>
            </Notice>
          )}
          {health.state === 'ok' && !serverChecks && (
            <Notice tone="warn">
              {t(
                'The server did not report its checks (an older version?). The choices below are not sent.',
                'سرور فهرست بررسی‌هایش را نداد (نسخهٔ قدیمی‌تر؟). انتخاب‌های زیر فرستاده نمی‌شوند.',
              )}
            </Notice>
          )}

          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
            {groups.map((g) => {
              const label = LABELS[g];
              const current = modeOf(g);
              return (
                <li key={g} className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/70 py-1.5">
                  <span className="text-sm text-slate-200">
                    {label ? t(label[0], label[1]) : <code className="font-mono">{g}</code>}
                    {current !== serverMode(g) && <span className="ms-2 text-xs text-amber-300">●</span>}
                  </span>
                  <span className="inline-flex overflow-hidden rounded-lg border border-slate-700" role="radiogroup" aria-label={g}>
                    {MODES.map(([m, text, on]) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={current === m}
                        onClick={() => choose(g, m)}
                        className={cx(
                          'border-s border-slate-700 px-2.5 py-1 text-xs first:border-s-0',
                          current === m ? on : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
                        )}
                      >
                        {t(text[0], text[1])}
                      </button>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setAll(null)}>
              {t('Server defaults', 'پیش‌فرض سرور')}
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setAll('info')}>
              {t('All hint only', 'همه فقط پیام')}
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setAll('off')}>
              {t('All off', 'همه خاموش')}
            </Button>
            <span className="text-xs text-slate-500">
              {t(
                'Applies to the next selfie. Face found and same person in the still always stay on.',
                'روی سلفی بعدی اعمال می‌شود. «وجود چهره» و «یکی بودن فرد در عکس نهایی» همیشه روشن می‌مانند.',
              )}
            </span>
          </div>
          {Object.keys(checkModes).length > 0 && (
            <p dir="ltr" className="font-mono text-xs text-slate-500">
              check_modes: {JSON.stringify(checkModes)}
            </p>
          )}
        </div>
      )}
    </Panel>
  );
}
