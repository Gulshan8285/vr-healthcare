"use client";

import { Phone, CalendarPlus } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { openEnquiryDrawer } from "./EnquiryDrawer";

interface MobileBottomBarProps {
  phone?: string;
  secondaryPhone?: string;
  whatsapp?: string;
}

export default function MobileBottomBar({
  phone = "+91 94815 68203",
  secondaryPhone = "+91 85918 50947",
  whatsapp = "+91 94815 68203",
}: MobileBottomBarProps) {
  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waLink = `https://wa.me/${waClean}?text=${waMessage}`;

  return (
    <aside
      aria-label="Quick mobile assistance"
      className="md:hidden fixed bottom-6 right-3.5 z-40 flex flex-col items-end gap-2 pointer-events-none"
    >
      {/* 24/7 Quick Call */}
      <a
        href={telLink}
        aria-label="Call 24/7 Helpline"
        className="pointer-events-auto inline-flex items-center gap-1.5 py-2 px-3 bg-slate-950/90 hover:bg-slate-900 text-white rounded-full text-[11px] font-bold shadow-lg shadow-slate-950/20 backdrop-blur-md border border-slate-700/50 active:scale-95 transition-all"
      >
        <Phone className="w-3.5 h-3.5 text-teal-400" />
        <span>Call 24/7</span>
      </a>

      {/* Quick Enquiry Drawer */}
      <button
        onClick={() => openEnquiryDrawer()}
        type="button"
        aria-label="Open Home Care Enquiry"
        className="pointer-events-auto inline-flex items-center gap-1.5 py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-[11px] font-bold shadow-lg shadow-teal-700/25 backdrop-blur-md border border-teal-400/40 active:scale-95 transition-all"
      >
        <CalendarPlus className="w-3.5 h-3.5 text-white" />
        <span>Enquire</span>
      </button>

      {/* Primary WhatsApp Action with live pulse */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto relative inline-flex items-center gap-2 py-2.5 px-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs font-extrabold shadow-xl shadow-emerald-500/35 active:scale-95 transition-all"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
