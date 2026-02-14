import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { menuCategories } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

export default function MenuSection() {
  const { t, bi } = useLang();
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const active = menuCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center mb-3">{t.menu.title}</h2>
          <p className="section-subtitle text-center mx-auto mb-10">{t.menu.subtitle}</p>
          <p className="section-subtitle text-center mx-auto mb-10">{t.menu.subtitle}</p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                {bi(cat.name)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Items */}
        <div className="space-y-1">
          {active.items.map((item, i) => (
            <ScrollReveal key={`${activeTab}-${i}`} delay={i * 60}>
              <div className="flex justify-between items-start py-5 border-b border-border/30 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-medium">{bi(item.name)}</h3>
                    {item.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {(t.tags as any)[tag] || tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{bi(item.description)}</p>
                </div>
                <span className="text-primary font-semibold whitespace-nowrap">{item.price} kr</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
