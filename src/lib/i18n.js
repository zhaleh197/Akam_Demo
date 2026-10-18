import { createContext, useContext } from 'react';

export const LangContext = createContext(null);

// { lang, isFa, toggle, t(en, fa), pick(apiObject, 'message' | 'label' | 'name') }
export const useLang = () => useContext(LangContext);
