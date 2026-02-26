"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "id";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");
  const [localeInitialized, setLocaleInitialized] = useState(false);

  useEffect(() => {
    const saved =
      window.localStorage.getItem("lang") ||
      window.localStorage.getItem("locale");

    if (saved === "id" || saved === "en") {
      setLocale(saved);
      setLocaleInitialized(true);
      return;
    }

    window.localStorage.setItem("lang", "id");
    window.localStorage.setItem("locale", "id");
    setLocaleInitialized(true);
  }, []);

  useEffect(() => {
    if (!localeInitialized) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem("lang", locale);
    window.localStorage.setItem("locale", locale);
  }, [locale, localeInitialized]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === "en" ? "id" : "en")),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}
