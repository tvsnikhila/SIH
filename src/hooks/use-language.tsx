'use client';

import { translations } from '@/lib/i18n';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof (typeof translations)['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('krishi_sakha_language') as Language;
    if (storedLanguage && ['en', 'ml'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if(typeof window !== 'undefined'){
        localStorage.setItem('krishi_sakha_language', lang);
    }
  };

  const t = useMemo(() => (key: keyof (typeof translations)['en']) => {
    return translations[language][key] || translations['en'][key];
  }, [language]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
