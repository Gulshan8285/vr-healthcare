import Image from "next/image";
import Link from "next/link";
import { getWebsiteSettings } from "@/lib/data";
import { Heart, ShieldCheck, Users, Eye, CheckCircle2, ArrowRight } from "lucide-react";

export default async function AboutUsPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About Us</span>
        </nav>

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            <span>Dedicated Home Care Coordination</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About VR Healthcare
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {settings.welcomeText ||
              "VR Healthcare aims to make home-care support more accessible and convenient for families. We understand that arranging assistance for a loved one can be an important decision, and we strive to make the enquiry and coordination process clear, respectful, and straightforward."}
          </p>
        </div>

        {/* Main Grid: Mission & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Our Mission
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {settings.aboutMission ||
                  "Our mission is to provide reliable and compassionate home-care support that helps individuals and families manage everyday care needs with greater confidence and peace of mind."}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Our Commitment to Families
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {settings.aboutCommitment ||
                  "We are dedicated to honest communication, clear service terms, and dedicated coordination to ensure peace of mind for families."}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Transparent discussion regarding duties and shift availability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Respecting patient comfort and individual dignity at all times</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Continuous coordination support throughout the service duration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <Image
                src="/images/about-care.jpg"
                alt="Compassionate home caregiver in consultation with senior family member"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Section: Our Approach */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs mb-16">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Thoughtful Approach
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              {settings.aboutApproach ||
                "We prioritize respecting individual needs, communicating transparently with families, thoroughly understanding requirements before service coordination, and treating every client with utmost dignity."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">1. Understanding Needs First</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We take the time to hear your situation—whether it is daily elderly assistance, recovery help, or personal hygiene assistance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">2. Realistic Availability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We only confirm services when suitable caregivers are genuinely available for your schedule and residential location.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">3. Dignified Daily Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Caregivers focus on empathetic companionship, fall prevention awareness, and supportive assistance to make days easier.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="text-center bg-teal-50 border border-teal-200/80 rounded-2xl p-8 sm:p-10">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Ready to Explore Home-Care Options?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Review our full list of services or contact our care coordination team today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-colors"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
