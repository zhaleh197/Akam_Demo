import { Check, X } from 'lucide-react';
import { useLang } from '../../lib/i18n';
import { TASK_TEXT } from '../texts';
import { KeyValue, Panel, Reasons, ResultSummary } from '../ui';

export default function LivenessResult({ result }) {
  const { t } = useLang();
  const d = result.data;
  return (
    <>
      <ResultSummary result={result} title={t('Active liveness', 'زنده بودن')} />
      <Panel title={t('Tasks', 'حرکت‌ها')}>
        <ul className="space-y-2">
          {d.tasks.map((task, i) => (
            <li key={`${task.task}-${i}`} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm">
              <span className="flex items-center gap-2">
                {task.done ? <Check className="h-4 w-4 text-emerald-400" /> : <X className="h-4 w-4 text-rose-400" />}
                {t(...(TASK_TEXT[task.task] || [task.task, task.task]))}
              </span>
              <span dir="ltr" className="font-mono text-xs text-slate-400">
                {d.task_seconds?.[i] != null ? `${d.task_seconds[i]} s` : '—'}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title={t('Checks on the video', 'بررسی‌های روی ویدیو')}>
        <KeyValue
          rows={[
            [t('Final state', 'وضعیت نهایی'), d.state, true],
            [t('Frames analysed', 'فریم‌های تحلیل‌شده'), d.frames_seen, true],
            [t('Identity: lowest similarity to selfie', 'هویت: کمترین شباهت به سلفی'), d.identity_min_similarity?.toFixed?.(3) ?? null, true],
            [t('Identity checks', 'تعداد بررسی هویت'), d.identity_checks, true],
            [t('Anti-spoof on frames', 'ضدجعل روی فریم‌ها'), d.antispoof_on_frames, true],
            [t('Live score (median)', 'امتیاز زنده بودن (میانه)'), d.live_score_median, true],
            [t('Live score (lowest)', 'امتیاز زنده بودن (کمترین)'), d.live_score_min, true],
          ]}
        />
      </Panel>
      <Panel title={t('Reasons', 'دلایل')}>
        <Reasons reasons={result.reasons} />
      </Panel>
    </>
  );
}
