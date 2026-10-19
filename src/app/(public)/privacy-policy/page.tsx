import Link from "next/link";
import { getContentPage } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default async function PrivacyPolicyPage() {
  const page = await getContentPage("privacy-policy");

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {page?.title || "Privacy Policy"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Last updated: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : "October 2026"}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
            {page?.content || `
VR Healthcare values your trust and is committed to protecting the privacy of our patients, families, and web visitors.

1. Information We Collect
We collect information provided voluntarily via our enquiry forms, telephone calls, or WhatsApp conversations:
- Full Name
- Contact telephone / mobile number
- Optional email address
- Required care assistance details and scheduling requirements

2. Purpose of Collection
Your information is strictly used for:
- Evaluating attendant and caregiver availability
- Communicating with you regarding requested home services
- Following up on ongoing home-care arrangements

3. Information Sharing & Security
- We do not sell or rent contact lists.
- We do not collect detailed clinical health records or sensitive diagnosis information through public website forms.
- Data is stored securely and accessible only to authorized coordination personnel.

If you have questions regarding this policy, please contact us at vrhealthcare@gmail.com.
            `}
          </div>
        </div>
      </div>
    </div>
  );
}
