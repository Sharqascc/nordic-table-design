import { useLang } from "@/context/LanguageContext";
import { reviews } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { Star } from "lucide-react";

export default function Reviews() {
  const { t, bi } = useLang();

  return (
    <section id="reviews" className="section-padding max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="section-title text-center mb-3">{t.reviews.title}</h2>
        <p className="section-subtitle text-center mx-auto mb-14">{t.reviews.subtitle}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="glass-card p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < r.rating ? "text-primary fill-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/85 text-sm leading-relaxed mb-4">"{bi(r.text)}"</p>
              <p className="text-muted-foreground text-sm font-medium">— {r.name}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
