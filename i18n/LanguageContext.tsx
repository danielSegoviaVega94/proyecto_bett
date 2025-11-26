'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { es } from './translations/es';
import { en } from './translations/en';

export type Language = 'es' | 'en';

export type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  es,
  en
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Spanish (Chile)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('apex-language');
    return (saved as Language) || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('apex-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
