import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Lang, Bi } from "@/data/restaurant";
import { getTranslations, type Translations } from "@/i18n/translations";

interface Ctx {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
  bi: (v: Bi) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sv");
  const toggleLang = useCallback(() => setLang((l) => (l === "sv" ? "en" : "sv")), []);
  const t = getTranslations(lang);
  const bi = useCallback((v: Bi) => v[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, bi }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
