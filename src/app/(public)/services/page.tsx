import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/data";
import EnquiryForm from "@/components/EnquiryForm";
import {
  HeartPulse,
  UserCheck,
  Stethoscope,
  ShieldAlert,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import ServiceCardAction from "@/components/ServiceCardAction";
import HeroEnquiryAction from "@/components/HeroEnquiryAction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Healthcare Services & Patient Attendants",
  description:
    "Explore VR Healthcare's trusted home-care support: Patient Care Attendants, Elderly Assistance, Post-Hospital Convalescence, Day & Night Care, and Housekeeping.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Home Healthcare Services | VR Healthcare",
    description:
      "Compassionate home-care assistance, patient attendants, and elderly support designed around family needs.",
    url: "https://www.vrhealthcare.space/services",
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="w-7 h-7 text-teal-600" />;
      case "UserCheck":
        return <UserCheck className="w-7 h-7 text-teal-600" />;
      case "Stethoscope":
        return <Stethoscope className="w-7 h-7 text-teal-600" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-7 h-7 text-teal-600" />;
      case "Sparkles":
        return <Sparkles className="w-7 h-7 text-teal-600" />;
      case "Clock":
        return <Clock className="w-7 h-7 text-teal-600" />;
      default:
        return <HeartPulse className="w-7 h-7 text-teal-600" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Services</span>
        </nav>

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Home-Care Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Home Healthcare & Attendant Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We provide structured, non-clinical home support designed to provide relief to family caregivers and gentle assistance to individuals recovering or requiring daily care at home.
          </p>
        </div>

        {/* Hero image highlight banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-16 bg-slate-900 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-4">
              <span className="text-teal-300 font-bold text-xs uppercase tracking-wider">
                Support Where Comfort Matters Most
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                Personalized Care in Familiar Surroundings
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Every client has unique comfort, mobility, and schedule requirements. We consult with families to understand expectations and coordinate the right attendant assistance.
              </p>
              <div className="pt-2">
                <HeroEnquiryAction secondary />
              </div>
            </div>
            <div className="lg:col-span-5 relative h-64 lg:h-80">
              <Image
                src="/images/service-recovery.jpg"
                alt="Patient assistance at home by VR Healthcare"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Detailed Services List */}
        <div className="space-y-12 mb-20">
          {services.map((service, index) => {
            let featuresList: string[] = [];
            try {
              if (service.features) {
                featuresList = JSON.parse(service.features);
              }
            } catch {
              featuresList = [];
            }

            return (
              <section
                id={service.slug}
                key={service.id}
                className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs scroll-mt-24 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                      {renderIcon(service.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                        Service #{index + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <ServiceCardAction serviceTitle={service.title} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Service Overview & Scope
                    </h3>
                    <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {service.fullDescription || service.shortDescription}
                    </div>

                    {service.slug === "day-night-care" && (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 mt-4">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Important Availability Notice:</strong> Daytime and nighttime care arrangements are subject to caregiver availability, specific regional scheduling, and family requirements. Please contact VR Healthcare directly to confirm current availability.
                        </div>
                      </div>
                    )}

                    {service.slug === "post-hospitalization-support" && (
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5 mt-4">
                        <AlertTriangle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Clinical Disclaimer:</strong> Care attendants assist with non-clinical convalescence, bed transfers, and everyday living. Medical treatments, sterile wound care, or clinical injections must be administered only by certified medical doctors or hospital nurses.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200/80">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                      Key Assistance Included
                    </h3>
                    {featuresList.length > 0 ? (
                      <ul className="space-y-3 text-xs text-slate-600">
                        {featuresList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Assistance tailored according to family requirements discussed during enquiry.
                      </p>
                    )}

                    <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Have questions?</span>
                      <a
                        href="/contact-us"
                        className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Speak with Coordinator</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Service Enquiry Form Section */}
        <section id="service-enquiry" className="scroll-mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Submit Your Care Enquiry
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your required service below and our care team will contact you.
            </p>
          </div>
          <EnquiryForm />
        </section>
      </div>
    </div>
  );
}
