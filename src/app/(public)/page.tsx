import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Phone,
  MessageCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  HeartPulse,
  UserCheck,
  Stethoscope,
  Sparkles,
  ShieldAlert,
  CalendarCheck,
  Users,
} from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import FAQAccordion from "@/components/FAQAccordion";
import { getWebsiteSettings, getServices, getFAQs } from "@/lib/data";

export default async function HomePage() {
  const [settings, services, faqs] = await Promise.all([
    getWebsiteSettings(),
    getServices(),
    getFAQs(),
  ]);

  const telLink = `tel:${settings.phone.replace(/[^0-9+]/g, "")}`;
  const waClean = settings.whatsappNumber.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${waClean}?text=${encodeURIComponent(
    "Hello VR Healthcare, I would like to enquire about your home-care services."
  )}`;

  // Icon mapping helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-teal-600" />;
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-teal-600" />;
      case "Stethoscope":
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-teal-600" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-teal-600" />;
      default:
        return <Heart className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient pt-8 pb-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                <span>Dedicated Home Healthcare & Attendant Support</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {settings.heroHeadline || "Compassionate Home Care for Your Loved Ones"}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {settings.heroSupporting ||
                  "Reliable home-care support designed to help individuals and families with everyday care, personal assistance, and support at home."}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#enquire"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/30 hover:shadow-lg transition-all"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Contact Us</span>
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Reassuring Trust Highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Personalized Care</h4>
                    <p className="text-[11px] text-slate-500">Arranged around your family needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Clear Communication</h4>
                    <p className="text-[11px] text-slate-500">Honest availability discussions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct Support</h4>
                    <p className="text-[11px] text-slate-500">Dedicated phone & WhatsApp help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-16/10">
                  <Image
                    src="/images/hero-caregiver.jpg"
                    alt="VR Healthcare compassionate home caregiver assisting a senior patient"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Attentive Home Support</div>
                    <div className="text-[11px] text-slate-500">Dignity • Compassion • Comfort</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WELCOME TO VR HEALTHCARE */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3">
                <Image
                  src="/images/about-care.jpg"
                  alt="Attentive caregiver supporting patient at VR Healthcare"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="text-xs font-bold text-teal-700 tracking-wider uppercase">
                About Our Home Care Mission
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {settings.welcomeHeadline || "Welcome to VR Healthcare"}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {settings.welcomeText ||
                  "At VR Healthcare, we understand how important it is to find dependable support for your loved ones. Our aim is to make arranging home-care assistance simpler by helping families explore suitable care options based on their needs and service availability."}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Whether you need everyday support for an aging parent, assistance during recovery after a hospital discharge, or a trusted daily patient attendant, we coordinate non-clinical care with transparency and care.
              </p>

              <div className="pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR SERVICES (6 Cards) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-2">
              Our Services
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Home-Care Support Designed for Your Family
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explore our range of supportive care options. Day and night care arrangements depend on availability and location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors"
                  >
                    Learn More &rarr;
                  </Link>
                  <a
                    href="#enquire"
                    className="px-3.5 py-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 underline underline-offset-4"
            >
              <span>View detailed descriptions of all services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE VR HEALTHCARE? */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-2">
              Why Families Trust Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Choose VR Healthcare?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              We focus on honest communication, personalized assistance, and respectful home-based support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Compassionate Approach</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe that every patient and elderly person deserves dignity, warmth, and respectful attention in their own home environment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Personalized Assistance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Care requirements vary greatly. We listen carefully to your family routine and discuss specific everyday needs before coordinating care.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Comfortable Home-Based Care</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Being surrounded by family and familiar surroundings helps recovery and reduces emotional stress for patients and older adults.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Clear Communication</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No false promises. We maintain straightforward communication regarding caregiver duties, shift schedules, and applicable charges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Care Coordination Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From your initial enquiry to ongoing check-ins, our coordination team is available to assist your family and address questions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Availability-Based Arrangements</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We confirm attendant availability and location feasibility before formalizing services to ensure dependable coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (4 Simple Steps) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-2">
              Straightforward Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Arranging care is easy and transparent. Please note that submitting an enquiry does not automatically confirm a booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Submit an Enquiry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your contact details, service requirement, and general schedule preferences via our quick online form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Discuss Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our care coordinator contacts you to understand the patient&apos;s condition, daily routine, and specific support needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Confirm Availability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The team reviews available attendants for your location and explains shift timings and applicable service charges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Arrange the Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once requirements, dates, and terms are mutually agreed upon, your home-care attendant service is coordinated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CALL TO ACTION BANNER */}
      <section className="py-14 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Looking for Reliable Home-Care Support?
          </h2>
          <p className="text-slate-200 text-base max-w-2xl mx-auto leading-relaxed">
            Tell us what kind of assistance you need, and our team can contact you to discuss the available options and confirm arrangements.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#enquire"
              className="px-6 py-3 text-sm font-bold bg-white text-teal-800 hover:bg-slate-100 rounded-xl shadow-md transition-colors"
            >
              Submit an Enquiry
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white rounded-xl shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: {settings.phone}</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-2">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about our home care support and enquiry process.
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* SECTION 8: FINAL ENQUIRY FORM */}
      <section id="enquire" className="py-16 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
