export default function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HomeHealthcare", "LocalBusiness"],
    "name": "VR Healthcare",
    "alternateName": "VR Home Healthcare & Patient Attendants",
    "description":
      "VR Healthcare coordinates reliable home-care support, patient attendants, elderly care, post-hospitalization recovery, and housekeeping assistance across India.",
    "url": "https://www.vrhealthcare.space",
    "telephone": "+919481568203",
    "email": "vrhealthcare@gmail.com",
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Net Banking, Credit Card",
    "image": "https://www.vrhealthcare.space/og-image.png",
    "logo": "https://www.vrhealthcare.space/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "All Over India (Pan-India Service Coordination)",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.209
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.1",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "126"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9481568203",
        "contactType": "customer service",
        "contactOption": "TollFree",
        "areaServed": "IN",
        "availableLanguage": ["Hindi", "English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-8591850947",
        "contactType": "emergency",
        "areaServed": "IN",
        "availableLanguage": ["Hindi", "English"]
      }
    ],
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Gurgaon" },
      { "@type": "City", "name": "Ghaziabad" },
      { "@type": "City", "name": "Faridabad" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "VR Healthcare Home Care Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Patient Care Assistance at Home",
            "description": "Bed-to-chair mobility, hygiene support, vital sign observation, and everyday routine assistance."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Elderly Care & Daily Routine",
            "description": "Compassionate elder companion assistance, medication reminders, walking support, and fall prevention."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Post-Hospitalization Support",
            "description": "Supportive convalescence care, rest room preparation, and mobility oversight after hospital discharge."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Patient Attendants (Day & Night)",
            "description": "Dedicated 12-hour or 24-hour shift home attendants for continuous patient assistance."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Day & Night Care Arrangements",
            "description": "Flexible daytime shifts or overnight vigilant support coordinated around family needs."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Cleaning & Housekeeping",
            "description": "Clean, sanitized living spaces, patient linen maintenance, and hygienic home environment."
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VR Healthcare",
    "url": "https://www.vrhealthcare.space",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.vrhealthcare.space/services?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does VR Healthcare offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VR Healthcare coordinates home-care support services including patient attendants, elderly assistance, post-hospitalization support, day and night care arrangements, and supportive housekeeping."
        }
      },
      {
        "@type": "Question",
        "name": "How can I enquire about home-care assistance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach out by calling our 24/7 care coordination desk at +91 94815 68203, chatting with us on WhatsApp, or submitting an online enquiry form on our website."
        }
      },
      {
        "@type": "Question",
        "name": "Is day or night care available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we coordinate both day shifts, night shifts, and round-the-clock attendants based on family requirements and caregiver availability in your area."
        }
      },
      {
        "@type": "Question",
        "name": "How does the enquiry process work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you submit your requirements, our care coordination team reviews attendant availability for your location, contacts you to discuss specifics, and arranges suitable caregiver options."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide medical or clinical procedures?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our attendants focus on supportive, non-clinical daily living assistance and companionship. For complex clinical treatments, IV medications, or emergencies, families should consult certified doctors and emergency healthcare providers."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
