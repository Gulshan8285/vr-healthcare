import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  settings?: {
    businessName?: string;
    phone?: string;
    whatsappNumber?: string;
    email?: string;
    serviceLocation?: string;
    businessHours?: string;
    footerText?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone = settings?.phone || "+91 98765 43210";
  const whatsapp = settings?.whatsappNumber || "+91 98765 43210";
  const email = settings?.email || "care@vrhealthcare.com";
  const location = settings?.serviceLocation || "Delhi NCR & Neighbouring Regions";
  const hours = settings?.businessHours || "Monday - Sunday: 8:00 AM - 8:00 PM";
  const footerText =
    settings?.footerText ||
    "VR Healthcare provides dependable, compassionate home-care support, patient attendants, and elderly assistance designed around your family's needs.";

  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent("Hello VR Healthcare, I would like to enquire about your home-care services.");
  const waLink = `https://wa.me/${waClean}?text=${waMessage}`;
  const mailLink = `mailto:${email}`;

  const serviceLinks = [
    { name: "Patient Care Assistance at Home", href: "/services#patient-care-assistance" },
    { name: "Elderly Care and Daily Assistance", href: "/services#elderly-care" },
    { name: "Post-Hospitalization Support", href: "/services#post-hospitalization-support" },
    { name: "Patient Attendants", href: "/services#patient-attendants" },
    { name: "Home Cleaning and Housekeeping", href: "/services#home-cleaning-housekeeping" },
    { name: "Day and Night Care Arrangements", href: "/services#day-night-care" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <Logo light />
            <p className="text-sm text-slate-400 leading-relaxed">
              {footerText}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Compassionate Family-Centric Support</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Our Home Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="hover:text-teal-400 transition-colors inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-teal-400 transition-colors">
                  About VR Healthcare
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-teal-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-teal-400 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordination */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Care Coordination
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Phone Support</span>
                  <a href={telLink} className="text-white font-medium hover:text-teal-400 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">WhatsApp Chat</span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-emerald-400 transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Email</span>
                  <a href={mailLink} className="text-white font-medium hover:text-teal-400 transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Service Coverage</span>
                  <span className="text-slate-300">{location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Hours</span>
                  <span className="text-slate-300 text-xs">{hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer strip */}
        <div className="py-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong>Service Notice:</strong> Care attendants and supportive caregivers provide non-clinical daily living assistance and companionship. In case of acute clinical conditions, medication changes, or medical emergencies, please consult a certified doctor or contact your nearest emergency medical facility. Day and night care arrangements are subject to staff availability.
          </p>
        </div>

        {/* Bottom copyright & admin login */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="flex items-center gap-1.5">
            &copy; {currentYear} VR Healthcare. All rights reserved. Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for families.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
