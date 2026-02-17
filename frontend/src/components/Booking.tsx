import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { CalendarDays, Users, CheckCircle2, AlertCircle, Lock } from "lucide-react";
import { generateOTP, verifyOTP, validatePhone, validateDate, validateTime } from "@/services/bookingService";
import type { BookingData } from "@/services/bookingService";

export default function Booking() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  
  const [form, setForm] = useState<BookingData>({
    name: "", email: "", phone: "", date: "", time: "", guests: "", message: "",
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: value });
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOtpError("");

    // Validate all fields
    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.guests) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate phone
    const phoneValidation = validatePhone(form.phone);
    if (!phoneValidation.valid) {
      setError(phoneValidation.error || "Invalid phone number");
      return;
    }

    // Validate date
    const dateValidation = validateDate(form.date);
    if (!dateValidation.valid) {
      setError(dateValidation.error || "Invalid date");
      return;
    }

    // Validate time
    const timeValidation = validateTime(form.time);
    if (!timeValidation.valid) {
      setError(timeValidation.error || "Invalid time");
      return;
    }

    setLoading(true);

    try {
      // Generate and send OTP
      const result = await generateOTP(form);
      setOtpId(result.otpId);
      setOtpStep(true);
    } catch (err) {
      console.error("OTP generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit code");
      return;
    }

    setOtpLoading(true);

    try {
      // Verify OTP
      await verifyOTP(otpId, otp);
      
      // Reset form and show success message
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "", message: "" });
      setOtp("");
      setOtpStep(false);
      setSubmitted(true);
    } catch (err) {
      console.error("OTP verification error:", err);
      setOtpError(err instanceof Error ? err.message : "Failed to verify code. Please try again.");
      setOtpLoading(false);
    }
  };

  const inputClass =
    "w-full bg-secondary border border-border/50 rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

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
          {!otpStep ? (
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
                onChange={handlePhoneChange}
                maxLength={10}
                disabled={loading}
                inputMode="numeric"
              />

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  required
                  type="date"
                  placeholder={t.booking.dateFormat}
                  className={inputClass}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  disabled={loading}
                  min={getMinDate()}
                />
                <input
                  required
                  type="time"
                  placeholder={t.booking.timeFormat}
                  className={inputClass}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  disabled={loading}
                  min="10:00"
                  max="22:00"
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
                {loading ? "Sending verification code..." : t.booking.submit}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="glass-card p-6 md:p-8 space-y-4">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verify Your Booking</h3>
                <p className="text-sm text-muted-foreground">
                  We sent a 6-digit code to {form.email}
                </p>
              </div>

              {otpError && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{otpError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Verification Code</label>
                <input
                  required
                  type="text"
                  placeholder="000000"
                  className={inputClass}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  disabled={otpLoading}
                  inputMode="numeric"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-2">Valid for 10 minutes</p>
              </div>

              <button 
                type="submit" 
                className="gold-button w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={otpLoading}
              >
                {otpLoading ? "Verifying..." : "Confirm Booking"}
              </button>

              <button 
                type="button"
                onClick={() => {
                  setOtpStep(false);
                  setOtp("");
                  setOtpError("");
                  setLoading(false);
                }}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={otpLoading}
              >
                Back to form
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
