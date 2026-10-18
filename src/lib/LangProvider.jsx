import { useEffect, useMemo, useState } from 'react';
import { LangContext } from './i18n';

const read = () => {
  try {
    return localStorage.getItem('akam_lang') || 'en';
  } catch {
    return 'en';
  }
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(read);
  useEffect(() => {
    try {
      localStorage.setItem('akam_lang', lang);
    } catch {
      /* storage blocked: the choice just isn't remembered */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      isFa: lang === 'fa',
      toggle: () => setLang((l) => (l === 'en' ? 'fa' : 'en')),
      // t('English', 'فارسی')
      t: (en, fa) => (lang === 'fa' && fa != null ? fa : en),
      // Picks message_fa / message_en (or label_fa / label_en) from API objects.
      pick: (obj, base = 'message') =>
        obj ? (lang === 'fa' ? obj[`${base}_fa`] || obj[`${base}_en`] : obj[`${base}_en`] || obj[`${base}_fa`]) || '' : '',
    }),
    [lang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
