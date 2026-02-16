import { useEffect, useState } from 'react';

export type Language = 'it' | 'en';

const LANGUAGE_KEY = 'portfolio-language';
const LANGUAGE_EVENT = 'portfolio-language-change';

function normalizeLanguage(value: string | null): Language {
  return value === 'en' ? 'en' : 'it';
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'it';

  const saved = window.localStorage.getItem(LANGUAGE_KEY);
  if (saved) return normalizeLanguage(saved);

  return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : 'it';
}

export function setLanguage(language: Language) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: language }));
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => getLanguage());

  useEffect(() => {
    const syncLanguage = () => setLanguageState(getLanguage());

    window.addEventListener('storage', syncLanguage);
    window.addEventListener(LANGUAGE_EVENT, syncLanguage as EventListener);

    return () => {
      window.removeEventListener('storage', syncLanguage);
      window.removeEventListener(LANGUAGE_EVENT, syncLanguage as EventListener);
    };
  }, []);

  return {
    language,
    setLanguage: (next: Language) => setLanguage(next),
  };
}
