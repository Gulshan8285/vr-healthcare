"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck, PhoneCall } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

interface EnquiryFormProps {
  defaultService?: string;
  sourceContext?: string;
  className?: string;
  compact?: boolean;
}

const SERVICE_OPTIONS = [
  "Patient Care Assistance at Home",
  "Elderly Care and Daily Assistance",
  "Post-Hospitalization Support",
  "Patient Attendants",
  "Home Cleaning and Housekeeping",
  "Day and Night Care Arrangements",
  "General Care Enquiry",
];

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 India (+91)", digits: 10 },
  { code: "+1", label: "🇺🇸 US / Canada (+1)", digits: 10 },
  { code: "+44", label: "🇬🇧 UK (+44)", digits: 10 },
  { code: "+971", label: "🇦🇪 UAE (+971)", digits: 9 },
  { code: "+65", label: "🇸🇬 Singapore (+65)", digits: 8 },
];

export default function EnquiryForm({
  defaultService = "",
  className = "",
  compact = false,
}: EnquiryFormProps) {
  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    requiredService: defaultService || "",
    preferredContactMethod: "phone", // "phone" or "whatsapp"
    preferredTime: "anytime",
    message: "",
    privacyConsent: true,
    botHoneypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceNumber: string;
    message: string;
    customerName: string;
    phone: string;
    service: string;
    preferredContactMethod: string;
  } | null>(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      errors.customerName = "Please enter your full name (minimum 2 characters).";
    }

    const cleanDigits = formData.phone.replace(/\D/g, "");
    if (!cleanDigits) {
      errors.phone = "Please enter your mobile phone number.";
    } else if (countryCode === "+91") {
      if (cleanDigits.length !== 10) {
        errors.phone = "Please enter a valid 10-digit Indian mobile number.";
      } else if (!/^[6-9]/.test(cleanDigits)) {
        errors.phone = "Indian mobile numbers must start with 6, 7, 8, or 9.";
      }
    } else if (cleanDigits.length < selectedCountry.digits - 1 || cleanDigits.length > selectedCountry.digits + 2) {
      errors.phone = `Please enter a valid phone number (${selectedCountry.digits} digits expected).`;
    }

    if (!formData.requiredService) {
      errors.requiredService = "Please select the service required.";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address or leave it empty.";
      }
    }

    if (!formData.privacyConsent) {
      errors.privacyConsent = "Please check the box to allow our care coordinator to reach out.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly numeric only
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: digitsOnly });
    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const fullPhoneNumber = `${countryCode} ${formData.phone}`;
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Unable to submit enquiry. Please call us directly.");
        return;
      }

      setSubmissionResult({
        referenceNumber: data.referenceNumber,
        message: data.message || "Your enquiry has been received successfully.",
        customerName: formData.customerName,
        phone: fullPhoneNumber,
        service: formData.requiredService,
        preferredContactMethod: formData.preferredContactMethod,
      });

      // Auto-open WhatsApp if preferred contact method is whatsapp
      if (formData.preferredContactMethod === "whatsapp") {
        const text = encodeURIComponent(
          `Hello VR Healthcare, I submitted an enquiry.\n\n📋 *Ref ID:* ${data.referenceNumber}\n👤 *Name:* ${formData.customerName}\n🩺 *Service:* ${formData.requiredService}\n📞 *Phone:* ${fullPhoneNumber}\n\nPlease check caregiver availability for our family.`
        );
        if (typeof window !== "undefined") {
          window.open(`https://wa.me/919481568203?text=${text}`, "_blank", "noopener,noreferrer");
        }
      }

      setFormData({
        customerName: "",
        phone: "",
        email: "",
        requiredService: defaultService || "",
        preferredContactMethod: "phone",
        preferredTime: "anytime",
        message: "",
        privacyConsent: true,
        botHoneypot: "",
      });
      setFieldErrors({});
    } catch {
      setServerError("Network error. Please call or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submissionResult) {
    const waText = encodeURIComponent(
      `Hello VR Healthcare, I submitted a care enquiry.\n\n📋 *Ref ID:* ${submissionResult.referenceNumber}\n👤 *Name:* ${submissionResult.customerName}\n🩺 *Service:* ${submissionResult.service}\n📞 *Phone:* ${submissionResult.phone}\n\nPlease confirm caregiver availability.`
    );
    const waLink = `https://wa.me/919481568203?text=${waText}`;

    return (
      <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl ${className}`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Enquiry Submitted
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Care Request Received
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md">
              Our 24/7 care coordination desk will review attendant availability for your location and contact you promptly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 border border-teal-200/80 rounded-2xl p-4 sm:p-5 w-full max-w-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Your Reference Number
            </span>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-teal-800 mt-1 tracking-wide">
              {submissionResult.referenceNumber}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Please save this ID for tracking your care coordination.
            </p>
          </div>

          {/* User Requested: Direct WhatsApp connection */}
          <div className="w-full max-w-sm space-y-2 pt-1">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-md text-xs sm:text-sm transition-all active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <a
              href="tel:+919481568203"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-98"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Call 24/7: +91 94815 68203</span>
            </a>
          </div>

          <button
            onClick={() => setSubmissionResult(null)}
            type="button"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 underline underline-offset-4 pt-2"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xl ${className}`}>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>24/7 Care Coordination</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Request Home Care Support
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Tell us about your care needs. We check attendant availability and discuss suitable arrangements.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{serverError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url_hp">Website</label>
          <input
            id="website_url_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botHoneypot}
            onChange={(e) => setFormData({ ...formData, botHoneypot: e.target.value })}
          />
        </div>

        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="customerName"
            type="text"
            required
            placeholder="e.g. Suresh Menon"
            value={formData.customerName}
            onChange={(e) => {
              setFormData({ ...formData, customerName: e.target.value });
              if (fieldErrors.customerName) setFieldErrors({ ...fieldErrors, customerName: "" });
            }}
            className={`w-full px-4 py-2.5 sm:py-3 text-sm bg-slate-50 border rounded-2xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.customerName
                ? "border-rose-400 focus:ring-rose-200"
                : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
            }`}
          />
          {fieldErrors.customerName && (
            <p className="text-xs text-rose-600 mt-1">{fieldErrors.customerName}</p>
          )}
        </div>

        {/* Phone Number with Country Code Dropdown (Numeric Only) */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mobile Number (Numbers Only) <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              aria-label="Select Country Code"
              className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-slate-100 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500 shrink-0"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                maxLength={14}
                placeholder={countryCode === "+91" ? "10-digit number" : "Phone number"}
                value={formData.phone}
                onChange={handlePhoneInput}
                className={`w-full pl-3.5 pr-11 py-2.5 sm:py-3 text-sm bg-slate-50 border rounded-2xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-mono ${
                  fieldErrors.phone
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          {fieldErrors.phone && (
            <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
          )}
        </div>

        {/* Required Service Dropdown */}
        <div>
          <label htmlFor="requiredService" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Required Service <span className="text-rose-500">*</span>
          </label>
          <select
            id="requiredService"
            required
            value={formData.requiredService}
            onChange={(e) => {
              setFormData({ ...formData, requiredService: e.target.value });
              if (fieldErrors.requiredService) setFieldErrors({ ...fieldErrors, requiredService: "" });
            }}
            className={`w-full px-4 py-2.5 sm:py-3 text-sm bg-slate-50 border rounded-2xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.requiredService
                ? "border-rose-400 focus:ring-rose-200"
                : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
            }`}
          >
            <option value="">-- Choose a Service --</option>
            {SERVICE_OPTIONS.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
          {fieldErrors.requiredService && (
            <p className="text-xs text-rose-600 mt-1">{fieldErrors.requiredService}</p>
          )}
        </div>

        {/* Preferred Contact Mode: Only Phone Call or WhatsApp (Email removed per user instruction) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Preferred Way To Contact You
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContactMethod: "phone" })}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                formData.preferredContactMethod === "phone"
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>Phone Call</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContactMethod: "whatsapp" })}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                formData.preferredContactMethod === "whatsapp"
                  ? "bg-[#25D366] text-white border-[#25D366] shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <WhatsAppIcon className={`w-4 h-4 ${formData.preferredContactMethod === "whatsapp" ? "fill-white" : "fill-[#25D366]"}`} />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Care Details / Notes */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Care Details / Timings <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            rows={compact ? 2 : 3}
            placeholder="e.g. Day shift, mobility assistance, location area..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500 resize-none transition-all"
          />
        </div>

        {/* Privacy consent checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => {
                setFormData({ ...formData, privacyConsent: e.target.checked });
                if (fieldErrors.privacyConsent) setFieldErrors({ ...fieldErrors, privacyConsent: "" });
              }}
              className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
            />
            <span>
              I authorize VR Healthcare coordinators to contact me via Phone or WhatsApp to discuss care options.
            </span>
          </label>
          {fieldErrors.privacyConsent && (
            <p className="text-xs text-rose-600 mt-1">{fieldErrors.privacyConsent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 active:scale-98 disabled:opacity-60 rounded-2xl shadow-md shadow-teal-600/30 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Care Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Care Request</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Submitting an enquiry does not commit you. We confirm availability first.</span>
        </div>
      </form>
    </div>
  );
}
