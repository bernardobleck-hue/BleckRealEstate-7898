import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { type Dictionary, en, pt } from "./dictionary";

export type Locale = "en" | "pt";

const STORAGE_KEY = "bleckteam.locale";
const DICTIONARIES: Record<Locale, Dictionary> = { en, pt };

interface LanguageValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "pt" || stored === "en" ? stored : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggle = useCallback(() => setLocaleState((prev) => (prev === "en" ? "pt" : "en")), []);

  const value = useMemo<LanguageValue>(
    () => ({ locale, setLocale, toggle, t: DICTIONARIES[locale] }),
    [locale, setLocale, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Shorthand for the active dictionary. */
export function useT() {
  return useLanguage().t;
}
