import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { CalendarDays, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { submitBooking } from "@/services/bookingService";

export default function Booking() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.guests) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Submit booking to backend
      await submitBooking(form);
      
      // Reset form and show success message
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "", message: "" });
      setSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit booking. Please try again.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-secondary border border-border/50 rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  if (submitted) {
    return (
      <section id="booking" className="section-padding">
        <div className="max-w-lg mx-auto text-center">
          <ScrollReveal>
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="section-title mb-3">{t.booking.success}</h2>
            <p className="section-subtitle mx-auto">{t.booking.successMsg}</p>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <CalendarDays className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="section-title mb-3">{t.booking.title}</h2>
            <p className="section-subtitle mx-auto">{t.booking.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder={t.booking.name}
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                disabled={loading}
              />
              <input
                required
                type="email"
                placeholder={t.booking.email}
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                disabled={loading}
              />
            </div>
            <input
              required
              type="tel"
              placeholder={t.booking.phone}
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
              disabled={loading}
            />
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                required
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                disabled={loading}
              />
              <input
                required
                type="time"
                className={inputClass}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                disabled={loading}
              />
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  type="number"
                  min="1"
                  max="50"
                  placeholder={t.booking.guests}
                  className={`${inputClass} pl-9`}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
            <textarea
              placeholder={t.booking.message}
              className={`${inputClass} min-h-[100px] resize-none`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="gold-button w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : t.booking.submit}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
