import { useLang } from "@/context/LanguageContext";
import { info, getTodayHours } from "@/data/restaurant";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, ExternalLink, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const { t, bi } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const time = hour * 60 + minute;

      let open = false;
      if (day >= 1 && day <= 4) open = time >= 660 && time < 1260; // 11:00-21:00
      if (day === 5) open = time >= 660 && time < 1320; // 11:00-22:00
      if (day === 6) open = time >= 720 && time < 1320; // 12:00-22:00
      if (day === 0) open = time >= 720 && time < 1200; // 12:00-20:00

      setIsOpen(open);
    };

    updateOpenStatus();
    const interval = setInterval(updateOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {info.address}
                  </a>
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

              {/* Opening hours with status badge */}
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl font-semibold">{t.contact.hours}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {isOpen ? "🟢 Öppet" : "🔴 Stängt"}
                  </span>
                </div>
                <div className="space-y-2 bg-secondary/30 rounded-lg p-4">
                  {info.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">{bi(h.day)}</span>
                      <span className="font-semibold">{h.time}</span>
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

          
        </div>
      </div>
    </section>
  );
}
