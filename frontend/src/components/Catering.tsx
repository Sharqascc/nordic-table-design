import { useLang } from "@/context/LanguageContext";
import { cateringPackages } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { Check } from "lucide-react";

export default function Catering() {
  const { t, bi, lang } = useLang();

  return (
    <section id="catering" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center mb-3">{t.catering.title}</h2>
          <p className="section-subtitle text-center mx-auto mb-14">{t.catering.subtitle}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cateringPackages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="glass-card p-7 flex flex-col h-full">
                <h3 className="font-serif text-xl font-semibold mb-1">{bi(pkg.name)}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.guests} {t.catering.guests}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xs text-muted-foreground">{t.catering.from}</span>
                  <span className="font-serif text-3xl font-bold gold-gradient-text">{pkg.priceFrom}</span>
                  <span className="text-muted-foreground text-sm">{t.catering.perPerson}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features[lang].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="outline-button text-sm w-full"
                >
                  {t.catering.request}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
