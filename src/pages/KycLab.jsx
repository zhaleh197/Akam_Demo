import { ArrowRight, FlaskConical } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { ApiLog, ConnectionPanel } from '../kyc/Connection';
import { MODULES } from '../kyc/modules';

const FLOW = ['ocr', 'forensics', 'face-capture', 'face-match', 'antispoof', 'liveness'];

export default function KycLab() {
  const { t } = useLang();
  const tr = (pair) => t(pair[0], pair[1]);
  const modules = MODULES.filter((m) => m.id !== 'case');
  const kase = MODULES.find((m) => m.id === 'case');

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 start-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-80 end-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <header className="relative mx-auto max-w-7xl px-4 pb-10 pt-32 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/50 px-4 py-2 text-sm text-slate-300">
          <FlaskConical className="h-4 w-4 text-cyan-400" />
          {t('Live demo of every module', 'دموی زندهٔ همهٔ ماژول‌ها')}
        </div>
        <h1 className="mb-5 text-4xl font-bold leading-tight text-white md:text-6xl">
          {t('KYC Lab', 'آزمایشگاه احراز هویت')}
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t('test each module on its own', 'هر ماژول را جداگانه آزمایش کنید')}
          </span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
          {t(
            'Every page below calls the real KYC service - OCR, face quality, face match, anti-spoofing, liveness and forensics - and shows its decision, score and the reasons behind it.',
            'هر صفحه سرویس واقعی KYC را فراخوانی می‌کند (OCR، کیفیت چهره، تطبیق چهره، ضدجعل، زنده بودن و جرم‌شناسی) و تصمیم، امتیاز و دلایل آن را نشان می‌دهد.',
          )}
        </p>
      </header>

      <div className="relative mx-auto max-w-7xl space-y-10 px-4 pb-24 sm:px-6">
        <ConnectionPanel />

        <section>
          <h2 className="mb-5 text-2xl font-bold text-white">{t('Modules', 'ماژول‌ها')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <a
                key={m.id}
                href={href(`/kyc/${m.id}`)}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-slate-900/80"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} text-white shadow-lg`}>
                    <m.icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-sm text-slate-600">{m.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{tr(m.title)}</h3>
                <div className="mb-3 text-sm text-cyan-300/80">{tr(m.tagline)}</div>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{tr(m.description)}</p>
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <code dir="ltr" className="truncate font-mono text-xs text-slate-500">{m.endpoints[m.endpoints.length - 1][1]}</code>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-cyan-400 transition-all group-hover:gap-2.5">
                    {t('Try it', 'امتحان کنید')}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <a
          href={href('/kyc/case')}
          className="group block overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 transition-colors hover:border-cyan-500/50 md:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-2 text-sm font-medium text-cyan-300">{t('End to end', 'سرتاسری')}</div>
              <h2 className="mb-3 text-3xl font-bold text-white">{tr(kase.title)}</h2>
              <p className="max-w-2xl leading-relaxed text-slate-400">{tr(kase.description)}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                {FLOW.map((id, i) => {
                  const m = MODULES.find((x) => x.id === id);
                  return (
                    <span key={id} className="inline-flex items-center gap-2">
                      <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-slate-300">{tr(m.title)}</span>
                      {i < FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-cyan-500 rtl:rotate-180" />}
                    </span>
                  );
                })}
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-shadow group-hover:shadow-cyan-500/40">
              {t('Run a full verification', 'اجرای احراز هویت کامل')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </span>
          </div>
        </a>

        <ApiLog />
      </div>
    </div>
  );
}
