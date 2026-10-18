"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { Phone, Menu, X, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { openEnquiryDrawer } from "./EnquiryDrawer";

interface NavbarProps {
  phone?: string;
  whatsapp?: string;
}

export default function Navbar({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waLink = `https://wa.me/${waClean}?text=${waMessage}`;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Services", href: "/services" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* 24/7 Continuous Animated Top Announcement Ticker */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white text-xs py-2 overflow-hidden border-b border-teal-900/50">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-medium">
          <span className="flex items-center gap-2 text-teal-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-white uppercase tracking-wider">24/7 Care Coordination Active</span>
          </span>
          <span className="text-slate-300">
            📞 Immediate Assistance: <a href={telLink} className="font-bold text-teal-300 underline">{phone}</a>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-300">
            🏥 Patient Attendants, Elderly Care, Post-Hospital Convalescence & Housekeeping
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-300">
            📍 Serving Delhi NCR, Noida, Gurgaon, Ghaziabad & Surrounding Areas
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400 inline" /> Instant WhatsApp Care Assistance
          </span>
          <span className="text-slate-300">•</span>
          {/* Duplicate set for seamless continuous marquee loop */}
          <span className="flex items-center gap-2 text-teal-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-white uppercase tracking-wider">24/7 Care Coordination Active</span>
          </span>
          <span className="text-slate-300">
            📞 Immediate Assistance: <a href={telLink} className="font-bold text-teal-300 underline">{phone}</a>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-300">
            🏥 Patient Attendants, Elderly Care, Post-Hospital Convalescence & Housekeeping
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-300">
            📍 Serving Delhi NCR, Noida, Gurgaon, Ghaziabad & Surrounding Areas
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400 inline" /> Instant WhatsApp Care Assistance
          </span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-teal-700 bg-teal-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={telLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call 24/7</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => openEnquiryDrawer()}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/30 transition-all hover:shadow hover:scale-102 active:scale-98"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={telLink}
              className="p-2 text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              aria-label="Call VR Healthcare"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              aria-label="WhatsApp VR Healthcare"
            >
              <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-teal-700 bg-teal-50 font-bold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryDrawer();
              }}
              type="button"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-teal-600 rounded-xl shadow-sm"
            >
              <span>Instant Care Enquiry (Side Drawer)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={telLink}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-xl"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call 24/7</span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
