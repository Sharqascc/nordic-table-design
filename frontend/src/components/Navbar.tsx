import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { info } from "@/data/restaurant";
import { cn } from "@/lib/utils";

const sections = ["featured", "menu", "lunch", "catering", "about", "gallery", "reviews", "contact", "booking"] as const;

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navLabels: Record<string, string> = {
    featured: t.nav.menu,
    menu: t.nav.menu,
    lunch: t.nav.lunch,
    catering: t.nav.catering,
    about: t.nav.about,
    reviews: t.nav.reviews,
    contact: t.nav.contact,
  };

  const visibleLinks = ["menu", "lunch", "about", "reviews", "contact"] as const;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "nav-scrolled" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-serif text-2xl md:text-3xl font-bold gold-gradient-text tracking-wide">
          {info.name}
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {visibleLinks.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "text-sm tracking-wide uppercase transition-colors duration-200",
                active === id ? "text-primary" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {navLabels[id]}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors" aria-label="Switch language">
            <Globe className="w-4 h-4" />
            {lang === "sv" ? "EN" : "SV"}
          </button>
          <button onClick={() => scrollTo("booking")} className="gold-button text-sm">
            {t.nav.book}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button onClick={toggleLang} className="text-foreground/70 hover:text-foreground" aria-label="Switch language">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/30 animate-fade-in">
          <div className="flex flex-col py-4 px-5 gap-1">
            {visibleLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-3 text-base text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {navLabels[id]}
              </button>
            ))}
            <button onClick={() => scrollTo("booking")} className="gold-button text-sm mt-3 w-full">
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
