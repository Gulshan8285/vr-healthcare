import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D9488",
};

export const metadata: Metadata = {
  title: {
    default: "VR Healthcare | Compassionate Home Care & Patient Support",
    template: "%s | VR Healthcare",
  },
  description:
    "Reliable home-care support, elderly assistance, post-hospitalization care, patient attendants, and housekeeping in your home.",
  keywords: [
    "Home Healthcare",
    "Patient Attendants",
    "Elderly Care",
    "Home Care Assistance",
    "Post-Hospitalization Support",
    "VR Healthcare",
  ],
  authors: [{ name: "VR Healthcare" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VR Healthcare | Compassionate Home Care & Patient Support",
    description:
      "Reliable home-care support, patient attendants, and elderly assistance designed around your family's needs.",
    type: "website",
    locale: "en_IN",
    siteName: "VR Healthcare",
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
        {children}
      </body>
    </html>
  );
}
