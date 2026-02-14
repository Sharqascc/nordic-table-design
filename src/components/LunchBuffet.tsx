import { useLang } from "@/context/LanguageContext";
import { lunchBuffet } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { UtensilsCrossed, Check } from "lucide-react";

export default function LunchBuffet() {
  const { t, bi, lang } = useLang();

  return (
    <section id="lunch" className="section-padding max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="glass-card p-8 md:p-12 text-center">
          <UtensilsCrossed className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="section-title mb-3">{t.lunch.title}</h2>
          <p className="section-subtitle mx-auto mb-6">{bi(lunchBuffet.description)}</p>

          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span className="font-serif text-5xl font-bold gold-gradient-text">{lunchBuffet.price}</span>
            <span className="text-muted-foreground">{t.lunch.price}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{bi(lunchBuffet.hours)}</p>

          <div className="flex flex-wrap justify-center gap-3">
            {lunchBuffet.includes[lang].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-sm bg-secondary px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
