import { useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { go, href } from '../lib/router';
import { cx } from '../lib/cx';

const scrollTo = (id) => {
  const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (window.location.hash.replace(/^#/, '') && window.location.hash !== '#/') {
    go('/');
    setTimeout(run, 80);
  } else {
    run();
  }
};

export default function SiteNav({ active }) {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    ['services', t('Services', 'خدمات'), () => scrollTo('services')],
    ['kyc', t('KYC Lab', 'آزمایشگاه KYC'), () => go('/kyc')],
    ['about', t('About us', 'درباره ما'), () => scrollTo('about')],
    ['contact', t('Contact', 'تماس'), () => scrollTo('contact')],
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href={href('/')} className="flex shrink-0 items-center">
          <img src="/imgs/logo.png" alt="Akam" className="h-12 w-auto object-contain md:h-14" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(([id, label, onClick]) => (
            <button
              key={id}
              type="button"
              onClick={onClick}
              className={cx(
                'rounded-lg px-3 py-2 text-sm transition-colors',
                active === id ? 'bg-slate-800/80 text-white' : 'text-slate-300 hover:text-white',
              )}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="ms-3 inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 px-3 py-2 text-sm text-white transition-colors hover:border-cyan-300 hover:bg-slate-900"
          >
            <Languages className="h-4 w-4 text-cyan-300" />
            {t('فارسی', 'English')}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button type="button" onClick={toggle} className="rounded-lg border border-slate-700 p-2 text-slate-200" aria-label="Language">
            <Languages className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-lg border border-slate-700 p-2 text-slate-200" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-800 px-4 py-3 md:hidden">
          {links.map(([id, label, onClick]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setOpen(false);
                onClick();
              }}
              className="block w-full rounded-lg px-3 py-2.5 text-start text-slate-200 hover:bg-slate-800"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
