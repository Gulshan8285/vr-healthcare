import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Phone,
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
  Star,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import EnquiryForm from "@/components/EnquiryForm";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";
import ServiceCardAction from "@/components/ServiceCardAction";
import HeroEnquiryAction from "@/components/HeroEnquiryAction";
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-teal-900 text-xs font-bold shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                <span>24/7 Home Care Coordination &amp; Patient Attendants</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {settings.heroHeadline || "Compassionate Home Care for Your Loved Ones"}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {settings.heroSupporting ||
                  "Reliable home-care support designed to help individuals and families with everyday care, personal assistance, and support at home."}
              </p>

              {/* Star Rating snippet */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-700">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span>4.9 / 5 Rating</span>
                <span className="text-slate-400">•</span>
                <span className="text-teal-700 font-bold">Trusted by 500+ Families in Delhi NCR</span>
              </div>

              {/* Interactive CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <HeroEnquiryAction />
                <a
                  href={telLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call 24/7</span>
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-sm transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Reassuring Trust Highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">24/7 Availability</h4>
                    <p className="text-[11px] text-slate-500">Day &amp; night shift arrangements</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Honest Communication</h4>
                    <p className="text-[11px] text-slate-500">Caregiver availability verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dedicated Attendants</h4>
                    <p className="text-[11px] text-slate-500">Dignified, warm personal care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image (featuring authentic Indian caregiver holding hands with patient) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3">
                  <Image
                    src="/images/about-care.jpg"
                    alt="Compassionate Indian home nurse assisting elderly patient at home"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-3 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Verified Home Attendants</div>
                    <div className="text-[11px] text-teal-700 font-semibold">24/7 Dedicated Support</div>
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
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3">
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

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <HeroEnquiryAction secondary />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR SERVICES (Swipable on mobile, Grid on desktop) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
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

          {/* User requested: Mobile swiping left/right */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {services.map((service) => (
              <div
                key={service.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-1 snap-start bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
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
                  {/* Direct enquiry button opening side drawer */}
                  <ServiceCardAction serviceTitle={service.title} />
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden text-center text-[11px] text-slate-400 mt-2">
            &larr; Swipe left/right to browse all 6 services &rarr;
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <WhatsAppIcon className="w-5 h-5 fill-teal-600" />
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
                From your initial enquiry to ongoing check-ins, our coordination team is available 24/7 to assist your family and address questions.
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

      {/* SECTION 5: HOW IT WORKS (User specifically requested: Right & left scroll on phone) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
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

          {/* User requested: Mobile swipe right and left */}
          <div className="flex md:grid md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[260px] sm:min-w-[300px] md:min-w-0 flex-1 snap-start bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Submit an Enquiry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your contact details, service requirement, and schedule preferences via our quick online form or side drawer.
              </p>
            </div>

            <div className="min-w-[260px] sm:min-w-[300px] md:min-w-0 flex-1 snap-start bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Discuss Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our care coordinator contacts you to understand the patient&apos;s condition, daily routine, and specific support needs.
              </p>
            </div>

            <div className="min-w-[260px] sm:min-w-[300px] md:min-w-0 flex-1 snap-start bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Confirm Availability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The team reviews available attendants for your location and explains shift timings and applicable service charges.
              </p>
            </div>

            <div className="min-w-[260px] sm:min-w-[300px] md:min-w-0 flex-1 snap-start bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Arrange the Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once requirements, dates, and terms are mutually agreed upon, your home-care attendant service is scheduled.
              </p>
            </div>
          </div>

          <div className="md:hidden text-center text-[11px] text-slate-400 mt-2">
            &larr; Swipe left/right to view all 4 steps &rarr;
          </div>
        </div>
      </section>

      {/* SECTION 6: VERIFIED REVIEWS & RATINGS */}
      <ReviewsSection />

      {/* SECTION 7: CALL TO ACTION BANNER */}
      <section className="py-14 bg-gradient-to-r from-teal-800 via-teal-900 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            24/7 Home Care Help Line
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Looking for Reliable Home-Care Support?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us what kind of assistance you need, and our care team can contact you immediately to discuss the available options.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <HeroEnquiryAction />
            <a
              href={telLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call 24/7: {settings.phone}</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
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

      {/* SECTION 9: FINAL IN-PAGE ENQUIRY FORM */}
      <section id="enquire" className="py-16 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
