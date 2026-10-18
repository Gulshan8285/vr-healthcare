import Link from "next/link";
import { getWebsiteSettings } from "@/lib/data";
import EnquiryForm from "@/components/EnquiryForm";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default async function ContactUsPage() {
  const settings = await getWebsiteSettings();

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsappNumber || "+91 98765 43210";
  const email = settings.email || "care@vrhealthcare.com";
  const location = settings.serviceLocation || "Delhi NCR & Neighbouring Regions";
  const hours = settings.businessHours || "Monday - Sunday: 8:00 AM - 8:00 PM";

  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waLink = `https://wa.me/${waClean}?text=${waMessage}`;
  const mailLink = `mailto:${email}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Contact Us</span>
        </nav>

        {/* Page Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>Care Coordination & Enquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact VR Healthcare
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions regarding home-care arrangements or attendant availability? Get in touch with our team directly.
          </p>
        </div>

        {/* Main Grid: Contact Cards + Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Direct Phone Support
                </span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  <a href={telLink} className="hover:text-teal-700 transition-colors">
                    {phone}
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Click to call for immediate care queries during business hours.
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  WhatsApp Chat
                </span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Start an instant chat to share details and enquire about availability.
                </p>
                <div className="mt-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email Assistance
                </span>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  <a href={mailLink} className="hover:text-teal-700 transition-colors">
                    {email}
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Send your enquiry details or requirements by email.
                </p>
              </div>
            </div>

            {/* Service Area & Hours */}
            <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Service Location
                  </span>
                  <div className="text-sm font-semibold text-white mt-0.5">{location}</div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Attendant home placements coordinated across the specified region.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Coordination Hours
                  </span>
                  <div className="text-sm font-semibold text-white mt-0.5">{hours}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Non-clinical home assistance with compassionate family care.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
