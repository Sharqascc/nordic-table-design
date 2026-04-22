import { useLang } from "@/context/LanguageContext";
import { about } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import chefImg from "@/assets/about-chef.jpg";

export default function About() {
  const { bi } = useLang();

  return (
    <section id="about" className="section-padding max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="aspect-[4/5] rounded-lg overflow-hidden">
            <img
              src={chefImg}
              alt="Qabeli Restaurang dining and kitchen"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          {/* Small gold label – change text here */}
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-3">
            About Qabeli
          </p>
          {/* Main heading from about.title */}
          <h2 className="section-title mb-4">
            {bi(about.title)}
          </h2>
          <p className="text-foreground/80 leading-relaxed text-base">
            {bi(about.text)}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
