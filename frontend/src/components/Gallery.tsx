import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/Gallery-1.jpeg",
    alt: "Qabeli Restaurang dining area with Afghan-inspired décor",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/Gallery-2.jpeg",
    alt: "Qabeli signature qabili pilau med lamm och morötter",
    span: "",
  },
  {
    src: "/Gallery-3.jpeg",
    alt: "Mixed grill-tallrik från Qabeli Restaurang",
    span: "",
  },
  {
    src: "/Gallery-4.jpeg",
    alt: "Dessert och te på Qabeli Restaurang",
    span: "",
  },
];

export default function Gallery() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center mb-3">
            {t.gallery.title}
          </h2>
          <p className="section-subtitle text-center mx-auto mb-14">
            {t.gallery.subtitle}
          </p>
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

        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-foreground"
              aria-label="Close"
            >
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
