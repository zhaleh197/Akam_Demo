import { useState } from 'react';
import { Activity, KeyRound, RefreshCw, Server, Trash2 } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { DEFAULT_BASE_URL, ERROR_TEXT } from './api';
import { useKyc } from './KycContext';
import { Button, Chip, Panel } from './ui';
import { cx } from '../lib/cx';

const STATUS = {
  ok: ['Connected', 'متصل', 'bg-emerald-400'],
  locked: ['Access code needed', 'کد دسترسی لازم است', 'bg-amber-400'],
  down: ['Offline', 'قطع', 'bg-rose-500'],
  checking: ['Checking…', 'در حال بررسی…', 'bg-slate-500 animate-pulse'],
};

export function StatusDot({ state }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {state === 'ok' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
      <span className={cx('relative inline-flex h-2.5 w-2.5 rounded-full', STATUS[state]?.[2])} />
    </span>
  );
}

export function StatusBadge() {
  const { health } = useKyc();
  const { t } = useLang();
  const s = STATUS[health.state];
  return (
    <a href="#/kyc" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500">
      <StatusDot state={health.state} />
      {t('KYC API', 'API احراز هویت')}: {t(s[0], s[1])}
    </a>
  );
}

// Where the site sends its requests, whether the service answers, and the
// optional access code (KYC_REQUIRE_ACCESS on the server).
export function ConnectionPanel() {
  const { baseUrl, accessCode, setConnection, health, checkHealth } = useKyc();
  const { t, isFa } = useLang();
  const [url, setUrl] = useState(baseUrl);
  const [code, setCode] = useState(accessCode);
  const s = STATUS[health.state];
  const dirty = url !== baseUrl || code !== accessCode;

  return (
    <Panel
      title={
        <span className="flex items-center gap-2">
          <Server className="h-4 w-4 text-cyan-400" />
          {t('KYC service connection', 'اتصال به سرویس KYC')}
        </span>
      }
      actions={
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <StatusDot state={health.state} />
          {t(s[0], s[1])}
          {health.customer && health.customer !== 'local' && <Chip tone="cyan">{health.customer}</Chip>}
        </span>
      }
    >
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="block text-sm">
          <span className="mb-1.5 block text-slate-400">{t('API base URL', 'آدرس پایهٔ API')}</span>
          <input
            dir="ltr"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={DEFAULT_BASE_URL}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 flex items-center gap-1.5 text-slate-400">
            <KeyRound className="h-3.5 w-3.5" />
            {t('Access code (if the server requires one)', 'کد دسترسی (اگر سرور لازم داشته باشد)')}
          </span>
          <input
            dir="ltr"
            type="password"
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </label>
        <div className="flex gap-2">
          {dirty ? (
            <Button
              onClick={() => {
                setConnection(url, code);
                setUrl(url.trim() || DEFAULT_BASE_URL);
                setCode(code.trim());
              }}
            >
              {t('Save', 'ذخیره')}
            </Button>
          ) : (
            <Button variant="secondary" icon={RefreshCw} onClick={checkHealth}>
              {t('Test', 'آزمایش')}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm">
        {health.state === 'ok' && (
          <div className="flex flex-wrap items-center gap-1.5 text-slate-400">
            {t('Modules online:', 'ماژول‌های فعال:')}
            {health.modules.map((m) => (
              <Chip key={m} tone="emerald" mono>
                {m}
              </Chip>
            ))}
          </div>
        )}
        {health.state === 'locked' && (
          <p className="text-amber-200">{isFa ? ERROR_TEXT.access_denied[1] : ERROR_TEXT.access_denied[0]}</p>
        )}
        {health.state === 'down' && (
          <div className="space-y-2 text-slate-400">
            <p className="text-rose-200">{isFa ? ERROR_TEXT.network_error[1] : ERROR_TEXT.network_error[0]}</p>
            <pre dir="ltr" className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs text-slate-300">
              {'cd E:\\1405\\kyc\n.venv\\Scripts\\python -m uvicorn kyc.api.app:app --port 8000'}
            </pre>
          </div>
        )}
      </div>
    </Panel>
  );
}

export function ApiLog() {
  const { log, clearLog } = useKyc();
  const { t } = useLang();
  return (
    <Panel
      title={
        <span className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          {t('API calls', 'فراخوانی‌های API')}
        </span>
      }
      subtitle={t('Every request this page sent to the KYC service.', 'همهٔ درخواست‌هایی که این صفحه به سرویس KYC فرستاده است.')}
      actions={
        log.length > 0 && (
          <Button variant="ghost" icon={Trash2} className="px-2 py-1 text-xs" onClick={clearLog}>
            {t('Clear', 'پاک کردن')}
          </Button>
        )
      }
      padded={false}
    >
      {log.length === 0 ? (
        <p className="px-5 py-6 text-sm text-slate-500">{t('No calls yet.', 'هنوز فراخوانی‌ای نشده است.')}</p>
      ) : (
        <ul dir="ltr" className="max-h-72 divide-y divide-slate-800/70 overflow-y-auto font-mono text-xs">
          {log.map((e) => (
            <li key={`${e.id}-${e.at}`} className="flex items-center gap-3 px-5 py-2">
              <span
                className={cx(
                  'w-10 shrink-0 rounded px-1.5 py-0.5 text-center font-semibold',
                  e.status === 0 ? 'bg-rose-500/20 text-rose-300' : e.status < 300 ? 'bg-emerald-500/15 text-emerald-300' : e.status < 500 ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/20 text-rose-300',
                )}
              >
                {e.status || 'ERR'}
              </span>
              <span className="w-10 shrink-0 text-slate-500">{e.method}</span>
              <span className="min-w-0 flex-1 truncate text-slate-300">{e.path}</span>
              <span className="shrink-0 text-slate-500">{Math.round(e.ms)} ms</span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
