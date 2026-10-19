"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, HeartHandshake } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

export function openEnquiryDrawer(serviceName?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-vr-enquiry-drawer", {
        detail: { service: serviceName || "" },
      })
    );
  }
}

export default function EnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ service?: string }>;
      setSelectedService(customEvent.detail?.service || "");
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("open-vr-enquiry-drawer", handleOpen);
    return () => {
      window.removeEventListener("open-vr-enquiry-drawer", handleOpen);
      document.body.style.overflow = "unset";
    };
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-over Panel from right side */}
      <div className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 ease-out border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
                24/7 Home Care Support
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Request Care Consultation
              </h2>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            type="button"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close enquiry drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 sm:p-6 flex-1 space-y-4">
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Share your contact details & care requirements. Our coordination team will review attendant availability for your location and contact you promptly.
            </span>
          </div>

          <EnquiryForm defaultService={selectedService} compact />
        </div>

        {/* Drawer Footer note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Prefer talking immediately? Call us 24/7 at{" "}
          <a href="tel:+919481568203" className="text-teal-700 font-bold hover:underline">
            +91 94815 68203
          </a>
          {" / "}
          <a href="tel:+918591850947" className="text-teal-700 font-bold hover:underline">
            +91 85918 50947
          </a>
        </div>
      </div>
    </div>
  );
}
