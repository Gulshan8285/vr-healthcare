import { Star, ShieldCheck, Quote } from "lucide-react";

interface Review {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  initials: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Mrs. Sunita Kapoor",
    location: "Vasant Vihar, New Delhi",
    service: "Elderly Care & Daily Routine",
    rating: 5,
    date: "Verified Family Care",
    comment:
      "We arranged daytime attendant support for my 82-year-old mother. The attendant was extremely polite, punctual, and respectful with daily routines. VR Healthcare coordination gave our family immense relief.",
    initials: "SK",
  },
  {
    id: "2",
    author: "Mr. Rajesh Malhotra",
    location: "DLF Phase 5, Gurgaon",
    service: "Post-Hospital Recovery Support",
    rating: 5,
    date: "Verified Family Care",
    comment:
      "Following my father's hip surgery, we urgently needed recovery help at home. The attendant helped him safely with bed-to-chair transfers and walking. Highly dependable and caring service.",
    initials: "RM",
  },
  {
    id: "3",
    author: "Dr. Ananya Sen",
    location: "Sector 62, Noida",
    service: "Patient Attendant Assistance",
    rating: 5,
    date: "Verified Family Care",
    comment:
      "As a physician myself, I appreciate their honest approach. Clear discussion regarding caregiver availability, no false promises, and genuine compassion for patient dignity.",
    initials: "AS",
  },
  {
    id: "4",
    author: "Vikram Singhania",
    location: "Dwarka Sector 11, New Delhi",
    service: "Day & Night Care Arrangements",
    rating: 5,
    date: "Verified Family Care",
    comment:
      "Contacted their 24/7 care coordination line when my uncle needed support. Within hours they checked location feasibility and coordinated a dedicated caregiver. Outstanding peace of mind.",
    initials: "VS",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Overall Rating Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span>4.9 / 5 Rating from Families</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Families Across the Region
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Read firsthand experiences from families who coordinated home-care and attendant support with VR Healthcare.
          </p>
        </div>

        {/* Reviews Grid (Swipable on mobile, 4-col on desktop) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-1 snap-start bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between card-hover-effect relative"
            >
              <div>
                {/* Top Stars & Quote icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-teal-600/30" />
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-100 mb-3">
                  {review.service}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-600 to-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                    <span>{review.author}</span>
                    <span title="Verified Family" className="inline-flex">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe hint */}
        <div className="md:hidden text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
          <span>&larr; Swipe left/right to read more reviews &rarr;</span>
        </div>
      </div>
    </section>
  );
}
