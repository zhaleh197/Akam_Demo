import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { href } from '../lib/router';
import { ApiLog, StatusBadge } from '../kyc/Connection';
import AntiSpoofDemo from '../kyc/demos/AntiSpoofDemo';
import CaseDemo from '../kyc/demos/CaseDemo';
import FaceCaptureDemo from '../kyc/demos/FaceCaptureDemo';
import FaceMatchDemo from '../kyc/demos/FaceMatchDemo';
import FaceQualityDemo from '../kyc/demos/FaceQualityDemo';
import ForensicsDemo from '../kyc/demos/ForensicsDemo';
import LivenessDemo from '../kyc/demos/LivenessDemo';
import OcrDemo from '../kyc/demos/OcrDemo';
import { MODULES, moduleById } from '../kyc/modules';
import { Endpoint } from '../kyc/ui';

const DEMOS = {
  ocr: OcrDemo,
  'face-quality': FaceQualityDemo,
  'face-capture': FaceCaptureDemo,
  'face-match': FaceMatchDemo,
  antispoof: AntiSpoofDemo,
  liveness: LivenessDemo,
  forensics: ForensicsDemo,
  case: CaseDemo,
};

export default function ModulePage({ id }) {
  const { t } = useLang();
  const m = moduleById(id);
  const Demo = DEMOS[id];
  if (!m || !Demo) return null;
  const tr = (pair) => t(pair[0], pair[1]);
  const i = MODULES.indexOf(m);
  const prev = MODULES[i - 1];
  const next = MODULES[i + 1];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <a href={href('/kyc')} className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('All KYC modules', 'همهٔ ماژول‌های KYC')}
        </a>
        <StatusBadge />
      </div>

      <header className="mb-8 flex flex-col gap-6 border-b border-slate-800 pb-8 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-5">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} text-white shadow-lg`}>
            <m.icon className="h-7 w-7" />
          </div>
          <div>
            <div className="mb-1 font-mono text-xs text-slate-500">{t('Module', 'ماژول')} {m.step}</div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{tr(m.title)}</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">{tr(m.description)}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5 md:items-end">
          {m.endpoints.map(([method, path]) => (
            <Endpoint key={path} method={method} path={path} />
          ))}
        </div>
      </header>

      <Demo />

      <div className="mt-12 space-y-6">
        <ApiLog />
        <div className="flex items-center justify-between gap-4 text-sm">
          {prev ? (
            <a href={href(`/kyc/${prev.id}`)} className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {tr(prev.title)}
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={href(`/kyc/${next.id}`)} className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400">
              {tr(next.title)}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
