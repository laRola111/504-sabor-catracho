'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './menu-data';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (text: { es: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (text) => text.es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('504-lang') as Language;
    if (saved === 'es' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('504-lang', newLang);
  };

  const t = (text: { es: string; en: string }) => text[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
