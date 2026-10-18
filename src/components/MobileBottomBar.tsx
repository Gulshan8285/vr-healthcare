"use client";

import { Phone, CalendarPlus } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { openEnquiryDrawer } from "./EnquiryDrawer";

interface MobileBottomBarProps {
  phone?: string;
  whatsapp?: string;
}

export default function MobileBottomBar({
  phone = "+91 98765 43210",
  whatsapp = "+91 98765 43210",
}: MobileBottomBarProps) {
  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waClean = whatsapp.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waLink = `https://wa.me/${waClean}?text=${waMessage}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2">
      {/* 24/7 Call button */}
      <a
        href={telLink}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform shadow-xs"
      >
        <Phone className="w-3.5 h-3.5 text-teal-400" />
        <span>Call 24/7</span>
      </a>

      {/* Official WhatsApp button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold active:scale-95 transition-transform shadow-xs"
      >
        <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
        <span>WhatsApp</span>
      </a>

      {/* Instant Enquiry Drawer button */}
      <button
        onClick={() => openEnquiryDrawer()}
        type="button"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform shadow-xs"
      >
        <CalendarPlus className="w-3.5 h-3.5 text-white" />
        <span>Enquire</span>
      </button>
    </div>
  );
}
