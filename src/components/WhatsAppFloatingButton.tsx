"use client";

import { MessageCircle } from "lucide-react";

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
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VR Healthcare on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          WhatsApp Support
        </span>
      </a>
    </aside>
  );
}
