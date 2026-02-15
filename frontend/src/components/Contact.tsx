import { useLang } from "@/context/LanguageContext";
import { info } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Contact() {
  const { t, bi } = useLang();

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center mb-3">{t.contact.title}</h2>
          <p className="section-subtitle text-center mx-auto mb-14">{t.contact.subtitle}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t.contact.address}</p>
                  <p className="text-muted-foreground text-sm">{info.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t.contact.phone}</p>
                  <a href={`tel:${info.phone}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{info.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t.contact.email}</p>
                  <a href={`mailto:${info.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{info.email}</a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="pt-4">
                <h3 className="font-serif text-xl font-semibold mb-4">{t.contact.hours}</h3>
                <div className="space-y-2">
                  {info.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{bi(h.day)}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 outline-button text-sm"
              >
                {t.contact.directions} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-lg overflow-hidden border border-border/30">
              <iframe
                src={info.mapEmbed}
                className="w-full h-full"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
