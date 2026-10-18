import Link from "next/link";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

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
  const hours = settings?.businessHours || "24/7 Care Coordination Available";
  const footerText =
    settings?.footerText ||
    "VR Healthcare provides dependable, compassionate home-care support, patient attendants, and elderly assistance designed around your family's needs.";

  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 md:pb-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <Logo light />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {footerText}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-teal-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Compassionate Family Care Coordination</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-teal-400">
              Home Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-teal-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-slate-400 hover:text-teal-300 transition-colors">
                  About VR Healthcare
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-teal-300 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Care Guides & Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordination */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4 text-teal-400">
              24/7 Care Coordination
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Direct Phone (24/7)</span>
                  <a href={telLink} className="text-white font-bold hover:text-teal-300 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">WhatsApp Assistance</span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-emerald-400 transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Email</span>
                  <a href={mailLink} className="text-white font-medium hover:text-teal-300 transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Coverage Area</span>
                  <span className="text-slate-300 text-xs">{location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Availability</span>
                  <span className="text-slate-300 text-xs">{hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User requested: Service note in clean single line */}
        <div className="py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 leading-normal text-center mb-8">
          <strong>Service Notice:</strong> Non-clinical attendants provide everyday home care assistance. Medical procedures and clinical treatments must strictly be administered by certified doctors.
        </div>

        {/* Bottom copyright and cleanly formatted Designed by credit */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs">
              &copy; 2026 VR Healthcare. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Designed by{" "}
              <a
                href="https://codeorbit.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
              >
                codeorbit.cloud
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
