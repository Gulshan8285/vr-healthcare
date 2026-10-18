"use client";

import { ArrowRight } from "lucide-react";
import { openEnquiryDrawer } from "./EnquiryDrawer";

export default function HeroEnquiryAction({ secondary = false }: { secondary?: boolean }) {
  if (secondary) {
    return (
      <button
        onClick={() => openEnquiryDrawer()}
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors"
      >
        <span>Request Care Attendant</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => openEnquiryDrawer()}
      type="button"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 rounded-xl shadow-md shadow-teal-600/30 hover:shadow-lg transition-all"
    >
      <span>Enquire Now</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
