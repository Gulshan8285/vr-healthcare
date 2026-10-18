import { prisma } from "./prisma";

export async function getWebsiteSettings() {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: "default" },
    });
    if (settings) return settings;
  } catch (error) {
    console.error("Failed to fetch website settings from DB:", error);
  }

  // Fallback defaults
  return {
    id: "default",
    businessName: "VR Healthcare",
    tagline: "Compassionate Home Care for Your Loved Ones",
    logoText: "VR Healthcare",
    logoUrl: null,
    phone: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210",
    email: "care@vrhealthcare.com",
    serviceLocation: "All Over India (Pan-India Coverage)",
    businessHours: "24/7 Hours Support & Emergency Care Coordination",
    heroHeadline: "Compassionate Home Care for Your Loved Ones",
    heroSupporting:
      "Reliable home-care support designed to help individuals and families with everyday care, personal assistance, and support at home.",
    welcomeHeadline: "Welcome to VR Healthcare",
    welcomeText:
      "At VR Healthcare, we understand how important it is to find dependable support for your loved ones. Our aim is to make arranging home-care assistance simpler by helping families explore suitable care options based on their needs and service availability.",
    aboutMission:
      "Our mission is to provide reliable and compassionate home-care support that helps individuals and families manage everyday care needs with greater confidence and peace of mind.",
    aboutApproach:
      "We prioritize respecting individual needs, communicating transparently with families, thoroughly understanding requirements before service coordination, and treating every client with utmost dignity.",
    aboutCommitment:
      "We are dedicated to honest communication, clear service terms, and dedicated coordination to ensure peace of mind for families.",
    footerText:
      "VR Healthcare provides dedicated home-care assistance, elderly support, patient attendants, and home care coordination with dignity and care.",
    seoTitle: "VR Healthcare | Compassionate Home Care & Patient Support",
    seoDescription:
      "Professional home healthcare, patient care assistance, elderly care, patient attendants, and housekeeping services.",
    updatedAt: new Date(),
  };
}

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Failed to fetch service with slug ${slug}:`, error);
    return null;
  }
}

export async function getFAQs() {
  try {
    return await prisma.fAQ.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}

export async function getContentPage(slug: string) {
  try {
    return await prisma.contentPage.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Failed to fetch content page with slug ${slug}:`, error);
    return null;
  }
}
