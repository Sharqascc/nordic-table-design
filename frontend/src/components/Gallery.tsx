import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { X } from "lucide-react";

import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import heroImg from "@/assets/hero-restaurant.jpg";
import chefImg from "@/assets/about-chef.jpg";

const galleryImages = [
  { src: heroImg, alt: "Saffran Restaurant dining area with warm lighting and traditional décor", span: "md:col-span-2 md:row-span-2" },
  { src: dish1, alt: "Lamb kebab platter with saffron rice and yogurt sauce", span: "" },
  { src: dish2, alt: "Mixed grill with chicken and lamb skewers", span: "" },
  { src: dish3, alt: "Golden saffron rice with chicken and dried fruits", span: "" },
  { src: dish4, alt: "Crispy falafel plate with hummus and tahini", span: "" },
  { src: dish5, alt: "Whole grilled sea bass with lemon herbs and roasted vegetables", span: "md:col-span-2" },
  { src: dish6, alt: "Dessert platter with baklava, kunafa and pistachio ice cream", span: "" },
  { src: chefImg, alt: "Ahmad Rashidi, founder and chef of Saffran Restaurant", span: "" },
];

export default function Gallery() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center mb-3">{t.gallery.title}</h2>
          <p className="section-subtitle text-center mx-auto mb-14">{t.gallery.subtitle}</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 60} className={img.span}>
              <button
                onClick={() => setLightbox(i)}
                className="w-full h-full aspect-square overflow-hidden rounded-lg group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-foreground" aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in"
            />
          </div>
        )}
      </div>
    </section>
  );
}    
