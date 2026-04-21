import { useLang } from "@/context/LanguageContext";
import { info } from "@/data/restaurant";
import { Instagram, Facebook, Music4 } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 px-5 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="font-serif text-2xl font-bold gold-gradient-text mb-2">{info.name}</p>
            <p className="text-muted-foreground text-sm">{info.address}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`tel:${info.phone}`} className="hover:text-primary transition-colors">{info.phone}</a>
            <a href={`mailto:${info.email}`} className="hover:text-primary transition-colors">{info.email}</a>
          </div>
          <div className="flex md:justify-end gap-4">
            <a href={info.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Saffran Restaurant Instagram" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded p-1">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={info.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Saffran Restaurant Facebook" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded p-1">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="border-t border-border/20 pt-6 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} {info.name}. {t.footer.rights}.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
