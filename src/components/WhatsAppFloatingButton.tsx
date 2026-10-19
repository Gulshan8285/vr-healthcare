"use client";

import WhatsAppIcon from "./WhatsAppIcon";
import { Phone } from "lucide-react";

interface WhatsAppFloatingButtonProps {
  whatsappNumber?: string;
  phone?: string;
}

export default function WhatsAppFloatingButton({
  whatsappNumber = "+91 94815 68203",
  phone = "+91 94815 68203",
}: WhatsAppFloatingButtonProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const telLink = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const message = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside
      aria-label="Quick contact buttons"
      className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2"
    >
      {/* Compact Call 24/7 Button */}
      <a
        href={telLink}
        aria-label="Call 24/7 Helpline"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-full text-xs font-bold shadow-md shadow-slate-900/20 backdrop-blur-md border border-slate-700/60 hover:scale-105 active:scale-95 transition-all"
      >
        <Phone className="w-3.5 h-3.5 text-teal-400" />
        <span>Call 24/7</span>
      </a>

      {/* Compact WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs font-bold shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
