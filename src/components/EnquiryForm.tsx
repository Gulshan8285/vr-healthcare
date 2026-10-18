"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck } from "lucide-react";

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

export default function EnquiryForm({
  defaultService = "",
  className = "",
  compact = false,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceNumber: string;
    message: string;
  } | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      errors.customerName = "Please enter your full name (minimum 2 characters).";
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.requiredService) {
      errors.requiredService = "Please select a required care service.";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.privacyConsent) {
      errors.privacyConsent = "Please agree to allow our team to contact you regarding your enquiry.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Unable to submit enquiry. Please try calling us directly.");
        return;
      }

      setSubmissionResult({
        referenceNumber: data.referenceNumber,
        message: data.message || "Your enquiry has been received successfully.",
      });

      // Reset form
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
      setServerError("Network error. Please check your connection or reach out via phone/WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (submissionResult) {
    return (
      <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-md ${className}`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Enquiry Received</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-md">
              Thank you for trusting VR Healthcare. Our care coordination team will review your requirements and reach out to you shortly.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 w-full max-w-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Enquiry Reference ID
            </span>
            <div className="text-lg font-mono font-bold text-teal-700 mt-0.5">
              {submissionResult.referenceNumber}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Please quote this reference number during any follow-up call.
            </p>
          </div>

          <button
            onClick={() => setSubmissionResult(null)}
            type="button"
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-4 pt-2"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Enquire About Home Care
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Share your care requirements. We will check availability and discuss appropriate arrangements with your family.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{serverError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-spam honeypot (hidden from human users) */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div>
            <label htmlFor="customerName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.customerName}
              onChange={(e) => {
                setFormData({ ...formData, customerName: e.target.value });
                if (fieldErrors.customerName) setFieldErrors({ ...fieldErrors, customerName: "" });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.customerName
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
              }`}
            />
            {fieldErrors.customerName && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.customerName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.phone
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>
            {fieldErrors.phone && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Required Service */}
          <div>
            <label htmlFor="requiredService" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
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
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
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

          {/* Email Address (Optional) */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.email
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:border-teal-500 focus:ring-teal-100"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred contact method */}
            <div>
              <label htmlFor="preferredContactMethod" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Contact Method
              </label>
              <select
                id="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
              >
                <option value="phone">Phone Call</option>
                <option value="whatsapp">WhatsApp Message</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Preferred time to contact */}
            <div>
              <label htmlFor="preferredTime" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Time To Contact
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
              >
                <option value="anytime">Anytime during business hours</option>
                <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
              </select>
            </div>
          </div>
        )}

        {/* Message / Care Details */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Care Details / Requirements <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            rows={compact ? 2 : 3}
            placeholder="Please mention any general requirements (e.g. day shift, mobility assistance, location area)..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500 resize-none transition-all"
          />
        </div>

        {/* Privacy consent */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => {
                setFormData({ ...formData, privacyConsent: e.target.checked });
                if (fieldErrors.privacyConsent) setFieldErrors({ ...fieldErrors, privacyConsent: "" });
              }}
              className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>
              I consent to VR Healthcare contacting me via phone, WhatsApp, or email to discuss home-care arrangements in accordance with the{" "}
              <a href="/privacy-policy" target="_blank" className="text-teal-700 underline font-medium">
                Privacy Policy
              </a>
              .
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
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-60 rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Care Enquiry</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Submitting an enquiry does not commit you to a booking. We verify terms & availability first.</span>
        </div>
      </form>
    </div>
  );
}
