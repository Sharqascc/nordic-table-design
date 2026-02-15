import { useLang } from "@/context/LanguageContext";
import { featuredDishes } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";

import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";

const images: Record<string, string> = {
  "dish-1": dish1, "dish-2": dish2, "dish-3": dish3,
  "dish-4": dish4, "dish-5": dish5, "dish-6": dish6,
};

export default function FeaturedDishes() {
  const { t, bi } = useLang();

  return (
    <section id="featured" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="text-primary text-sm uppercase tracking-[0.2em] mb-3">{t.nav.menu}</p>
        <h2 className="section-title mb-3">{t.featured.title}</h2>
        <p className="section-subtitle mb-14">{t.featured.subtitle}</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDishes.map((dish, i) => (
          <ScrollReveal key={dish.image} delay={i * 100}>
            <div className="glass-card group overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={images[dish.image]}
                  alt={bi(dish.name)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg font-semibold">{bi(dish.name)}</h3>
                  <span className="text-primary font-semibold whitespace-nowrap ml-3">{dish.price} {t.featured.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{bi(dish.description)}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
