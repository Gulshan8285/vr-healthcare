import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D9488",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vrhealthcare.space"),
  title: {
    default: "VR Healthcare | Compassionate Home Care & Patient Support",
    template: "%s | VR Healthcare",
  },
  description:
    "VR Healthcare coordinates reliable home-care support, patient attendants, elderly assistance, post-hospitalization recovery, and housekeeping assistance across India. 24/7 care coordination desk.",
  keywords: [
    "VR Healthcare",
    "VR Healthcare India",
    "Patient Care Attendants at Home",
    "In-Home Elderly Care India",
    "Elderly Care Services",
    "Post-Hospitalization Home Support",
    "24/7 Patient Attendant Service",
    "Home Healthcare Coordination",
    "Senior Citizen Attendants Delhi NCR",
    "Patient Attendants Noida Gurgaon",
    "Home Patient Caretaker Services",
    "Nursing Attendant for Elderly",
    "Patient Assistance at Home",
    "Day Night Patient Attendant",
    "Home Care Assistance India",
    "Home Cleaning and Patient Sanitization",
  ],
  authors: [{ name: "VR Healthcare", url: "https://www.vrhealthcare.space" }],
  creator: "VR Healthcare",
  publisher: "VR Healthcare",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VR Healthcare | Compassionate Home Care & Patient Support",
    description:
      "Reliable home-care support, patient attendants, and elderly assistance designed around your family's needs. 24/7 Care Coordination.",
    url: "https://www.vrhealthcare.space",
    siteName: "VR Healthcare",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VR Healthcare | Compassionate Home Care & Patient Support",
    description:
      "Reliable home-care support, patient attendants, and elderly assistance designed around your family's needs.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
