import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for VR Healthcare...");

  // 1. Initial Admin User
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@vrhealthcare.com";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "Admin@VRHealth2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
    },
    create: {
      name: "VR Healthcare Administrator",
      email: adminEmail,
      passwordHash,
      role: "admin",
      active: true,
    },
  });
  console.log(`Admin user created/verified: ${admin.email}`);

  // 2. Default Website Settings
  await prisma.websiteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "VR Healthcare",
      tagline: "Compassionate Home Care for Your Loved Ones",
      logoText: "VR Healthcare",
      phone: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      email: "care@vrhealthcare.com",
      serviceLocation: "All Over India (Pan-India Care Coordination)",
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
        "VR Healthcare provides dedicated home-care assistance, elderly support, patient attendants, and home care coordination with dignity, safety, and care.",
      seoTitle: "VR Healthcare | Compassionate Home Care & Patient Support",
      seoDescription:
        "Professional home healthcare, patient care assistance, elderly care, patient attendants, and housekeeping services.",
    },
  });
  console.log("Website settings seeded.");

  // 3. Six Standard Services
  const services = [
    {
      title: "Patient Care Assistance at Home",
      slug: "patient-care-assistance",
      icon: "HeartPulse",
      shortDescription:
        "Home-based assistance for individuals who need additional support with everyday care activities. Requirements are discussed with the family to understand the appropriate type of assistance.",
      fullDescription:
        "Our Patient Care Assistance service provides compassionate, non-clinical daily living support for patients recovering or coping with chronic conditions at home. We work closely with families to understand individual mobility, personal hygiene, meal assistance, and comfort requirements.\n\nNote: Non-clinical attendants provide everyday assistance and are not substitutes for licensed doctors or certified clinical nurses.",
      features: JSON.stringify([
        "Assistance with personal hygiene and grooming",
        "Assistance with safe mobility and walking support",
        "Timely medication reminders as prescribed",
        "Nutritious mealtime assistance and hydration check",
        "Comfort and companion support in familiar surroundings"
      ]),
      displayOrder: 1,
      seoTitle: "Patient Care Assistance at Home | VR Healthcare",
      seoDescription: "Compassionate home-based personal assistance and everyday patient care support in your home.",
    },
    {
      title: "Elderly Care and Daily Assistance",
      slug: "elderly-care",
      icon: "UserCheck",
      shortDescription:
        "Support for older adults who may need assistance with everyday activities and a more comfortable daily routine at home.",
      fullDescription:
        "Our elderly care support is dedicated to helping senior citizens enjoy dignity, comfort, and safety in their own homes. We help with daily routines, mobility assistance, fall prevention awareness, companionship, and coordination so that family members can have peace of mind.",
      features: JSON.stringify([
        "Daily routine management and compassionate companionship",
        "Assistance with morning routines, bathing, and dressing",
        "Support with gentle indoor walking and mobility",
        "Prescription medication reminders",
        "Reassuring presence and regular communication with family"
      ]),
      displayOrder: 2,
      seoTitle: "Elderly Care & Daily Assistance at Home | VR Healthcare",
      seoDescription: "Compassionate daily elderly care support, companion assistance, and mobility support for senior family members.",
    },
    {
      title: "Post-Hospitalization Support",
      slug: "post-hospitalization-support",
      icon: "Stethoscope",
      shortDescription:
        "Assistance for individuals returning home after a hospital stay who may need additional everyday support during their recovery period.",
      fullDescription:
        "The transition from hospital to home requires attentive everyday support, physical rest, and structured assistance. Our post-hospitalization support team assists patients with bed-to-chair transfers, comfortable positioning, routine hydration, and daily care tasks during recovery.\n\nClarification: Medical treatments, invasive clinical procedures, and prescription adjustments must strictly be provided by appropriately qualified medical professionals.",
      features: JSON.stringify([
        "Non-clinical recuperation and convalescence support",
        "Assistance with comfortable bed positioning and transfers",
        "Medication schedule tracking based on discharge summary",
        "Hydration, gentle nutrition support, and vital signs monitoring",
        "Coordination with family members regarding daily progress"
      ]),
      displayOrder: 3,
      seoTitle: "Post-Hospitalization Support at Home | VR Healthcare",
      seoDescription: "Safe and attentive recovery support at home following hospital discharge for your loved ones.",
    },
    {
      title: "Patient Attendants",
      slug: "patient-attendants",
      icon: "ShieldAlert",
      shortDescription:
        "Patient attendant arrangements for individuals and families seeking help with non-clinical daily support and care coordination at home.",
      fullDescription:
        "Dedicated patient attendants offer focused assistance for individuals needing constant observation, personal hygiene care, assistance with walking, and help with daytime activities. Attendants serve as a supportive pillar for family caregivers needing structured assistance.",
      features: JSON.stringify([
        "Attentive personal care assistance throughout scheduled hours",
        "Assistance with bathroom visits, toileting, and linen changes",
        "Light physical activity assistance and companion support",
        "Clear record-keeping of daily care activities",
        "Reliable coordination with family caregivers"
      ]),
      displayOrder: 4,
      seoTitle: "Patient Attendant Services at Home | VR Healthcare",
      seoDescription: "Reliable patient attendant support for dedicated home-care assistance and caregiver relief.",
    },
    {
      title: "Home Cleaning and Housekeeping",
      slug: "home-cleaning-housekeeping",
      icon: "Sparkles",
      shortDescription:
        "Home cleaning and housekeeping assistance for customers who need help maintaining a clean and comfortable home environment.",
      fullDescription:
        "A sanitized, tidy, and organized home is essential for patient recovery and elderly wellbeing. Our home cleaning and housekeeping support focuses on maintaining hygienic patient rooms, sanitized bathrooms, dusted surfaces, and tidy living areas.",
      features: JSON.stringify([
        "Patient room dusting, sweeping, and sanitization",
        "Bathroom cleaning and non-slip safety upkeep",
        "Bed linen changing and fresh laundry management",
        "Kitchen counter and light dishware cleaning",
        "Trash disposal and hygienic waste management"
      ]),
      displayOrder: 5,
      seoTitle: "Home Cleaning & Housekeeping for Care Environments | VR Healthcare",
      seoDescription: "Hygienic cleaning and daily housekeeping support for homes with recovery or elderly care needs.",
    },
    {
      title: "Day and Night Care Arrangements",
      slug: "day-night-care",
      icon: "Clock",
      shortDescription:
        "Daytime and nighttime care arrangements may be available depending on staffing, location, service requirements, and scheduling.",
      fullDescription:
        "Depending on individual family requirements, daytime support, evening oversight, or overnight assistance can be coordinated. We discuss specific hour requirements, location feasibility, and caregiver arrangements directly with the family.\n\nImportant Note: Day and night care arrangements depend on caregiver availability and specific regional scheduling. Please contact VR Healthcare to confirm current availability.",
      features: JSON.stringify([
        "Flexible daytime shifts (e.g., 8-hour or 12-hour support)",
        "Overnight attendant support for night-time reassurance",
        "Subject to location feasibility and caregiver availability",
        "Transparent discussion of shift arrangements and applicable charges",
        "Dedicated point of contact for coordination"
      ]),
      displayOrder: 6,
      seoTitle: "Day & Night Care Arrangements | VR Healthcare",
      seoDescription: "Flexible day and night home-care arrangements based on location and staffing availability.",
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log("6 default services seeded.");

  // 4. Default FAQs
  const faqs = [
    {
      question: "What services does VR Healthcare offer?",
      answer:
        "VR Healthcare provides supportive home-care assistance, including patient care assistance at home, elderly care and daily routine support, post-hospitalization everyday recovery support, dedicated patient attendants, care-oriented housekeeping, and day/night care coordination.",
      displayOrder: 1,
    },
    {
      question: "How can I enquire about home-care assistance?",
      answer:
        "You can easily submit an enquiry through our online form, give us a direct phone call, or click the WhatsApp button to chat. Our coordination team will get in touch to understand your specific requirements.",
      displayOrder: 2,
    },
    {
      question: "Is day or night care available?",
      answer:
        "Daytime, evening, and night care arrangements may be organized depending on caregiver availability, required duties, and service location. Please contact our team directly so we can check current staffing and discuss terms.",
      displayOrder: 3,
    },
    {
      question: "How does the enquiry process work?",
      answer:
        "The process consists of 4 simple steps: 1) Submit an enquiry with your contact details and required service, 2) Discuss your requirements with our team, 3) Confirm care arrangement terms and caregiver availability, 4) Service arrangement is confirmed and scheduled.",
      displayOrder: 4,
    },
    {
      question: "How do I confirm service availability?",
      answer:
        "Submitting an enquiry allows us to review your location, dates, and requirements. Once our coordinator checks availability, we will call you to confirm whether suitable attendants or caregivers are available for your requested schedule.",
      displayOrder: 5,
    },
    {
      question: "Do you provide medical or clinical procedures?",
      answer:
        "Our caregivers and attendants provide non-clinical personal care assistance, mobility support, comfort, and housekeeping. Clinical medical procedures, invasive treatments, or prescription alterations must strictly be handled by licensed doctors and hospital nursing staff.",
      displayOrder: 6,
    },
  ];

  // Clear existing FAQs and re-seed clean order
  await prisma.fAQ.deleteMany({});
  for (const f of faqs) {
    await prisma.fAQ.create({
      data: f,
    });
  }
  console.log("Default FAQs seeded.");

  // 5. Default Content Pages (Privacy Policy, Terms)
  await prisma.contentPage.upsert({
    where: { slug: "privacy-policy" },
    update: {},
    create: {
      slug: "privacy-policy",
      title: "Privacy Policy",
      seoTitle: "Privacy Policy | VR Healthcare",
      seoDescription: "Information about how VR Healthcare collects, uses, and safeguards customer enquiry details.",
      content: `## Privacy Policy for VR Healthcare

At VR Healthcare, we respect your privacy and are committed to protecting the personal information you share with us.

### Information We Collect
When you submit an enquiry through our website or contact us via phone or WhatsApp, we may collect:
- Full Name
- Phone number
- Optional email address
- Required care service and general message
- Preferred time of contact

### How We Use Your Information
Your information is used solely to:
- Respond to your home-care enquiries and discuss service requirements
- Confirm caregiver availability and coordinate service arrangements
- Provide customer support and follow up on your requested care arrangements

### Data Protection & Retention
- We do not sell, rent, or trade your contact information with third-party advertisers.
- Access to enquiry information is restricted to authorized administrative and coordination staff.
- We do not collect unnecessary confidential medical records through public online forms.

### Contact Us
If you have questions regarding this privacy policy or wish to update your details, please reach out via our contact page or email us at care@vrhealthcare.com.`,
    },
  });

  await prisma.contentPage.upsert({
    where: { slug: "terms-and-conditions" },
    update: {},
    create: {
      slug: "terms-and-conditions",
      title: "Terms and Conditions",
      seoTitle: "Terms & Conditions | VR Healthcare",
      seoDescription: "Terms and conditions for home healthcare coordination services with VR Healthcare.",
      content: `## Terms and Conditions

Welcome to VR Healthcare. By accessing our website or submitting an enquiry, you agree to the following terms and guidelines.

### Nature of Services
- VR Healthcare coordinates home-care support, elderly assistance, patient attendants, and housekeeping assistance.
- Submitting an online enquiry does not constitute a guaranteed contract or instant booking. Service commencement is subject to mutual agreement on service terms, caregiver availability, and scope of assistance.

### Non-Clinical Disclaimer
- Care attendants provide non-clinical everyday living support, mobility assistance, companionship, and comfort.
- In emergencies or for complex clinical interventions (e.g. intravenous medications, ventilator management, or specialized wound dressing), families must engage licensed physicians or accredited emergency medical providers.

### Service Availability
- Day and night shifts, specific schedules, and attendant placements are subject to location feasibility and staff availability.

### Modifications
- We reserve the right to modify these terms and service offerings at any time. Updates will be reflected on this page.`,
    },
  });
  console.log("Content pages (Privacy Policy & Terms) seeded.");

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
