"use client";

import { openEnquiryDrawer } from "./EnquiryDrawer";

export default function ServiceCardAction({ serviceTitle }: { serviceTitle: string }) {
  return (
    <button
      onClick={() => openEnquiryDrawer(serviceTitle)}
      type="button"
      className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 rounded-lg transition-all shadow-xs"
    >
      Enquire Now
    </button>
  );
}
