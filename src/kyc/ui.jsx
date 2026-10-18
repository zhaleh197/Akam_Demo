import { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ImagePlus,
  Info,
  Loader2,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { useLang } from '../lib/i18n';
import { cx } from '../lib/cx';
import { ERROR_TEXT } from './api';
import { useObjectUrl } from './hooks';


// ------------------------------------------------------------------ layout

export function Panel({ title, subtitle, actions, children, className, padded = true }) {
  return (
    <section className={cx('rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur', className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div className="min-w-0">
            {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </section>
  );
}

export function Button({ variant = 'primary', loading, icon, children, className, ...props }) {
  const Icon = icon;
  const styles = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 disabled:hover:shadow-none',
    secondary: 'border border-slate-700 bg-slate-800/70 text-slate-100 hover:border-cyan-500/60 hover:bg-slate-800',
    ghost: 'text-slate-300 hover:bg-slate-800/70 hover:text-white',
    danger: 'border border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
  };
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50',
        styles[variant],
        className,
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function Endpoint({ method, path }) {
  const color = method === 'GET' ? 'text-emerald-300 bg-emerald-500/10' : 'text-cyan-300 bg-cyan-500/10';
  return (
    <code dir="ltr" className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/70 px-2 py-1 font-mono text-xs">
      <span className={cx('rounded px-1.5 py-0.5 font-semibold', color)}>{method}</span>
      <span className="text-slate-300">{path}</span>
    </code>
  );
}

export function Notice({ tone = 'info', children, className }) {
  const styles = {
    info: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-100',
    ok: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
    warn: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
    err: 'border-rose-500/30 bg-rose-500/10 text-rose-100',
  };
  const Icon = { info: Info, ok: CheckCircle2, warn: AlertTriangle, err: XCircle }[tone];
  return (
    <div className={cx('flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed', styles[tone], className)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function Empty({ icon = Info, children }) {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-800 px-6 py-14 text-center text-sm text-slate-500">
      <Icon className="h-8 w-8 text-slate-600" />
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

export function Spinner({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 py-14 text-sm text-slate-400">
      <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
      {children}
    </div>
  );
}

// ------------------------------------------------------------------ results

const DECISION = {
  pass: { en: 'Pass', fa: 'قبول', cls: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300', Icon: CheckCircle2 },
  review: { en: 'Review', fa: 'بررسی دستی', cls: 'border-amber-500/40 bg-amber-500/15 text-amber-300', Icon: AlertTriangle },
  fail: { en: 'Fail', fa: 'رد', cls: 'border-rose-500/40 bg-rose-500/15 text-rose-300', Icon: XCircle },
};

export function DecisionBadge({ decision, size = 'md' }) {
  const { t } = useLang();
  const d = DECISION[decision];
  if (!d) return null;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold',
        size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-2.5 py-0.5 text-xs',
        d.cls,
      )}
    >
      <d.Icon className={size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      {t(d.en, d.fa)}
    </span>
  );
}

export function ScoreBar({ value, label, format = (v) => `${Math.round(v * 100)}%` }) {
  const v = Math.max(0, Math.min(1, Number(value) || 0));
  const color = v >= 0.75 ? 'from-emerald-400 to-emerald-500' : v >= 0.45 ? 'from-amber-400 to-amber-500' : 'from-rose-400 to-rose-500';
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span dir="ltr" className="font-mono text-slate-200">{format(v)}</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className={cx('h-full rounded-full bg-gradient-to-r', color)} style={{ width: `${v * 100}%` }} />
      </div>
    </div>
  );
}

// A score on 0..1 with the module's own decision lines drawn on it.
export function ThresholdGauge({ value, rejectBelow, acceptAbove, label, caption }) {
  const { t } = useLang();
  const pct = (x) => `${Math.max(0, Math.min(1, x)) * 100}%`;
  const has = value != null && !Number.isNaN(value);
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <span className="text-sm text-slate-400">{label}</span>
        <span dir="ltr" className="font-mono text-3xl font-bold text-white">{has ? value.toFixed(3) : '—'}</span>
      </div>
      {/* Bars always run left to right: it is a number line. */}
      <div dir="ltr" className="relative h-3 rounded-full">
        <div className="absolute inset-y-0 left-0 rounded-s-full bg-rose-500/50" style={{ width: pct(rejectBelow) }} />
        <div className="absolute inset-y-0 bg-amber-500/50" style={{ left: pct(rejectBelow), width: pct(acceptAbove - rejectBelow) }} />
        <div className="absolute inset-y-0 right-0 rounded-e-full bg-emerald-500/50" style={{ left: pct(acceptAbove) }} />
        {has && (
          <div
            className="absolute -top-1.5 h-6 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.7)] transition-all duration-500"
            style={{ left: pct(value) }}
          />
        )}
      </div>
      <div dir="ltr" className="relative mt-1.5 h-4 font-mono text-[11px] text-slate-500">
        <span className="absolute left-0">0</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(rejectBelow) }}>{rejectBelow}</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(acceptAbove) }}>{acceptAbove}</span>
        <span className="absolute right-0">1</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-500" />{t('Reject', 'رد')}</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber-500" />{t('Manual review', 'بررسی دستی')}</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-emerald-500" />{t('Accept', 'قبول')}</span>
        {caption && <span className="text-slate-500">· {caption}</span>}
      </div>
    </div>
  );
}

export function Reasons({ reasons, emptyText }) {
  const { t, pick } = useLang();
  if (!reasons?.length) {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-300">
        <CheckCircle2 className="h-4 w-4" />
        {emptyText || t('No findings - every check passed.', 'موردی یافت نشد؛ همهٔ بررسی‌ها قبول شد.')}
      </div>
    );
  }
  const icon = {
    error: <XCircle className="h-4 w-4 text-rose-400" />,
    warn: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    info: <Info className="h-4 w-4 text-cyan-400" />,
  };
  return (
    <ul className="space-y-2">
      {reasons.map((r, i) => (
        <li key={`${r.code}-${i}`} className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
          <span className="mt-0.5 shrink-0">{icon[r.severity] || icon.info}</span>
          <div className="min-w-0 text-sm">
            <div className="text-slate-100">{pick(r) || r.code}</div>
            <div dir="ltr" className="mt-0.5 font-mono text-[11px] text-slate-500 ltr:text-left rtl:text-right">
              {r.code}
              {r.field ? ` · ${r.field}` : ''}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Header strip for any ModuleResult envelope.
export function ResultSummary({ result, title }) {
  const { t } = useLang();
  if (!result) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <DecisionBadge decision={result.decision} size="lg" />
        <div className="text-sm">
          <div className="font-medium text-white">{title}</div>
          <div dir="ltr" className="font-mono text-xs text-slate-500 ltr:text-left rtl:text-right">
            {result.module} v{result.version}
          </div>
        </div>
      </div>
      <div className="flex gap-6 text-sm">
        <Stat label={t('Score', 'امتیاز')} value={result.score?.toFixed(3)} />
        <Stat label={t('Server time', 'زمان سرور')} value={`${Math.round(result.elapsed_ms)} ms`} />
      </div>
    </div>
  );
}

export function Stat({ label, value, mono = true }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div dir="ltr" className={cx('text-base font-semibold text-white ltr:text-left rtl:text-right', mono && 'font-mono')}>
        {value ?? '—'}
      </div>
    </div>
  );
}

export function KeyValue({ rows }) {
  return (
    <dl className="divide-y divide-slate-800/80 text-sm">
      {rows
        .filter((r) => r && r[1] !== undefined)
        .map(([k, v, mono]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-slate-400">{k}</dt>
            <dd dir={mono ? 'ltr' : undefined} className={cx('text-end text-slate-100', mono && 'font-mono text-xs')}>
              {v === null || v === '' ? '—' : String(v)}
            </dd>
          </div>
        ))}
    </dl>
  );
}

// Raw JSON with long base64 strings shortened, so the payload stays readable.
export function JsonView({ data, title }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = useMemo(
    () =>
      JSON.stringify(
        data,
        (k, v) => (typeof v === 'string' && v.length > 160 ? `${v.slice(0, 48)}… (${v.length} chars)` : v),
        2,
      ),
    [data],
  );
  if (data == null) return null;
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-white"
      >
        <span className="font-medium">{title || t('Raw API response (JSON)', 'پاسخ خام API (JSON)')}</span>
        <ChevronDown className={cx('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="relative border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:text-white"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? t('Copied', 'کپی شد') : t('Copy', 'کپی')}
          </button>
          <pre dir="ltr" className="max-h-[28rem] overflow-auto p-4 text-left font-mono text-xs leading-relaxed text-slate-300">
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}

const CAMERA_ERROR = {
  NotAllowedError: ['Camera access was denied. Allow the camera for this site and try again.', 'اجازهٔ دسترسی به دوربین داده نشد. دسترسی دوربین را برای این سایت فعال کنید و دوباره تلاش کنید.'],
  NotFoundError: ['No camera was found on this device.', 'دوربینی روی این دستگاه پیدا نشد.'],
  NotReadableError: ['The camera is in use by another application.', 'دوربین در اختیار برنامهٔ دیگری است.'],
  SecurityError: ['The camera needs HTTPS (or localhost).', 'دوربین فقط روی HTTPS (یا localhost) کار می‌کند.'],
};

export function ErrorBox({ error, onRetry }) {
  const { t, isFa } = useLang();
  if (!error) return null;
  if (!error.method) {
    // Not an API error: the camera, or something in the browser.
    const cam = CAMERA_ERROR[error.name];
    return (
      <Notice tone="err">
        <div className="font-medium">{cam ? t(...cam) : t('Something went wrong in the browser.', 'خطایی در مرورگر رخ داد.')}</div>
        <div dir="ltr" className="mt-1 font-mono text-[11px] text-rose-300/60 ltr:text-left rtl:text-right">
          {error.name}: {error.message}
        </div>
      </Notice>
    );
  }
  const known = ERROR_TEXT[error.code];
  const headline = known ? (isFa ? known[1] : known[0]) : t('The request failed.', 'درخواست ناموفق بود.');
  const serverMsg = isFa ? error.message_fa || error.message_en : error.message_en;
  return (
    <Notice tone="err">
      <div className="font-medium">{headline}</div>
      {serverMsg && serverMsg !== headline && <div className="mt-1 text-rose-200/80">{serverMsg}</div>}
      <div dir="ltr" className="mt-2 font-mono text-[11px] text-rose-300/60 ltr:text-left rtl:text-right">
        {error.method} {error.path} → {error.status || 'network'}
        {error.code ? ` · ${error.code}` : ''}
      </div>
      {onRetry && (
        <Button variant="ghost" icon={RefreshCw} onClick={onRetry} className="mt-2 -ms-2 px-2 py-1 text-rose-100">
          {t('Try again', 'تلاش دوباره')}
        </Button>
      )}
    </Notice>
  );
}

// ------------------------------------------------------------------ images

export function ImageDrop({ file, onFile, label, hint, capture, className }) {
  const { t } = useLang();
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const preview = useObjectUrl(file);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith('image/')) onFile(f);
      }}
      className={cx(
        'group relative overflow-hidden rounded-xl border-2 border-dashed transition-colors',
        drag ? 'border-cyan-400 bg-cyan-500/5' : 'border-slate-700 hover:border-cyan-500/60',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={capture}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (f) onFile(f);
        }}
      />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="" className="max-h-80 w-full bg-slate-950 object-contain" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-slate-950 to-transparent px-3 pb-3 pt-8">
            <span dir="ltr" className="truncate text-xs text-slate-300">
              {file.name} · {(file.size / 1024).toFixed(0)} KB
            </span>
            <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => inputRef.current.click()}>
              {t('Replace', 'تعویض')}
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="flex w-full flex-col items-center gap-3 px-6 py-12 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-cyan-400 transition-transform group-hover:scale-110">
            <ImagePlus className="h-7 w-7" />
          </div>
          <div className="text-sm font-medium text-slate-200">{label || t('Choose an image', 'انتخاب تصویر')}</div>
          <div className="text-xs text-slate-500">
            {hint || t('Drag & drop, or click to browse · JPG / PNG, up to 12 MB', 'بکشید و رها کنید یا کلیک کنید · JPG / PNG تا ۱۲ مگابایت')}
          </div>
        </button>
      )}
    </div>
  );
}

const TONE = {
  cyan: '#22d3ee',
  emerald: '#34d399',
  amber: '#fbbf24',
  rose: '#fb7185',
  violet: '#a78bfa',
  slate: '#94a3b8',
};

// An image with boxes / points drawn in its own pixel coordinates.
export function Annotated({ src, boxes = [], points = [], className }) {
  const [size, setSize] = useState(null);
  if (!src) return null;
  const w = size?.w || 1;
  const stroke = Math.max(2, w / 300);
  const font = Math.max(12, w / 38);
  return (
    <div className={cx('relative overflow-hidden rounded-xl bg-slate-950', className)} dir="ltr">
      <img
        src={src}
        alt=""
        className="block w-full"
        onLoad={(e) => setSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
      />
      {size && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="none"
        >
          {boxes.map((b, i) => {
            const [x1, y1, x2, y2] = b.box;
            const color = TONE[b.tone || 'cyan'];
            return (
              <g key={i}>
                <rect
                  x={x1}
                  y={y1}
                  width={x2 - x1}
                  height={y2 - y1}
                  fill={b.fill ? `${color}22` : 'none'}
                  stroke={color}
                  strokeWidth={stroke}
                  rx={stroke}
                />
                {b.label && (
                  <text
                    x={x1}
                    y={Math.max(font, y1 - stroke * 2)}
                    fill={color}
                    fontSize={font}
                    fontWeight="600"
                    style={{ paintOrder: 'stroke', stroke: '#020617', strokeWidth: font / 5 }}
                  >
                    {b.label}
                  </text>
                )}
              </g>
            );
          })}
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={stroke * 1.6} fill={TONE.amber} stroke="#020617" strokeWidth={stroke / 2} />
          ))}
        </svg>
      )}
    </div>
  );
}

export function Chip({ tone = 'slate', children, mono }) {
  const styles = {
    slate: 'border-slate-700 bg-slate-800/60 text-slate-300',
    cyan: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200',
    emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
    rose: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  };
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs', styles[tone], mono && 'font-mono')}>
      {children}
    </span>
  );
}

