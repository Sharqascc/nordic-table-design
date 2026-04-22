import { useLang } from "@/context/LanguageContext";
import { info, getTodayHours } from "@/data/restaurant";
import { Clock } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";


export default function Hero() {
  const { t, bi, lang } = useLang();

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background image with scale animation */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Saffran Restaurant interior with traditional Middle Eastern decoration"
          className="w-full h-full object-cover animate-scale-hero"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <p className="text-primary font-sans text-sm md:text-base uppercase tracking-[0.25em] mb-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
          Stockholm
        </p>

        <div className="flex justify-center mb-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <img
            src="/38x38 cm Golden.svg"
            alt="Qabeli Restaurang logo"
            className="h-28 w-auto md:h-32 object-contain logo-float"
          />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
          {info.name}
        </h1>

        <p className="text-foreground/80 text-lg md:text-xl max-w-lg mb-8 animate-fade-up" style={{ animationDelay: "600ms" }}>
          {bi(info.tagline)}
        </p>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-up" style={{ animationDelay: "800ms" }}>
          <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} className="gold-button text-base">
            {t.hero.cta1}
          </button>
          <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} className="outline-button text-base">
            {t.hero.cta2}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "1000ms" }}>
          <span className="inline-flex items-center gap-2 text-sm text-foreground/70 bg-secondary/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {t.hero.openToday}: {getTodayHours()}
          </span>
          {info.trustChips[lang].map((chip) => (
            <span key={chip} className="text-xs uppercase tracking-wider text-foreground/50 bg-secondary/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/20">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
