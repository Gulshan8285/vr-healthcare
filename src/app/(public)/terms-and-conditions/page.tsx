import Link from "next/link";
import { getContentPage } from "@/lib/data";
import { FileText } from "lucide-react";

export default async function TermsPage() {
  const page = await getContentPage("terms-and-conditions");

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Terms & Conditions</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {page?.title || "Terms and Conditions"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Last updated: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : "October 2026"}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
            {page?.content || `
Welcome to VR Healthcare. By accessing our website or placing an enquiry, you acknowledge the following terms:

1. Scope of Support Services
VR Healthcare arranges non-clinical patient attendants, elderly assistance, daily routine care, and supportive housekeeping at home.

2. Enquiry Confirmation Policy
Submitting an online form does not constitute a binding booking or instant commitment. Care arrangements are confirmed after mutual review of patient requirements, caregiver availability, schedule details, and applicable charges.

3. Non-Clinical Care Disclaimer
Our attendants and caregivers provide supportive everyday care, mobility assistance, companion oversight, and comfort. In emergency situations or for specialized medical/nursing procedures (including IV therapy, prescription administration, or sterile medical dressings), families must engage certified hospital doctors and licensed nursing staff.

4. Shift Availability
Daytime, nighttime, or extended care shifts are subject to caregiver availability in the specified residential area.

For any questions about these terms, please contact vrhealthcare@gmail.com.
            `}
          </div>
        </div>
      </div>
    </div>
  );
}
