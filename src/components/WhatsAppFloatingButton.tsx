"use client";

import WhatsAppIcon from "./WhatsAppIcon";

interface WhatsAppFloatingButtonProps {
  whatsappNumber?: string;
}

export default function WhatsAppFloatingButton({
  whatsappNumber = "+91 98765 43210",
}: WhatsAppFloatingButtonProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  );
  const waUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside
      aria-label="Quick WhatsApp contact"
      className="hidden sm:block fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VR Healthcare on WhatsApp"
        className="relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-200"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
        <span className="text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
