import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendAdminEnquiryNotification } from "@/lib/notifications";

// POST: Public enquiry submission
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    // 1. Rate Limiting
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      requiredService,
      message,
      preferredContactMethod,
      preferredTime,
      privacyConsent,
      botHoneypot,
    } = body;

    // 2. Anti-spam honeypot
    if (botHoneypot) {
      return NextResponse.json({ success: true, referenceNumber: "VRH-RECEIVED" });
    }

    // 3. Validation
    if (!customerName || customerName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // Clean and validate phone: accept Indian 10-digit or valid international
    const cleanedPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";
    if (!cleanedPhone || cleanedPhone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number or phone number." },
        { status: 400 }
      );
    }

    if (!requiredService || requiredService.trim().length === 0) {
      return NextResponse.json(
        { error: "Please select the service you are enquiring about." },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "Please acknowledge the privacy consent to submit your enquiry." },
        { status: 400 }
      );
    }

    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "Please provide a valid email address or leave it empty." },
          { status: 400 }
        );
      }
    }

    // 4. Generate unique reference number: e.g. VRH-2610-8291
    const datePrefix = new Date().toISOString().slice(2, 7).replace("-", ""); // e.g. 2610
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `VRH-${datePrefix}-${randomSuffix}`;

    // 5. Database persistence
    const enquiry = await prisma.enquiry.create({
      data: {
        referenceNumber,
        customerName: customerName.trim(),
        phone: cleanedPhone,
        email: email ? email.trim() : null,
        requiredService: requiredService.trim(),
        message: message ? message.trim() : null,
        preferredContactMethod: preferredContactMethod || "phone",
        preferredTime: preferredTime ? preferredTime.trim() : null,
        privacyConsent: true,
        status: "New",
        ipAddress: ip.slice(0, 45),
      },
    });

    // 6. Extensible notification trigger
    await sendAdminEnquiryNotification({
      referenceNumber: enquiry.referenceNumber,
      customerName: enquiry.customerName,
      phone: enquiry.phone,
      email: enquiry.email,
      requiredService: enquiry.requiredService,
      message: enquiry.message,
      createdAt: enquiry.createdAt,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: enquiry.referenceNumber,
      message: "Thank you for reaching out to VR Healthcare. Your enquiry has been received.",
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Unable to process enquiry at this moment. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }
}

// GET: Admin enquiries query
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const service = searchParams.get("service") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  const skip = (page - 1) * limit;

  // Build filter conditions
  const where: Record<string, unknown> = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (service && service !== "ALL") {
    where.requiredService = service;
  }

  if (search) {
    where.OR = [
      { customerName: { contains: search } },
      { phone: { contains: search } },
      { referenceNumber: { contains: search } },
      { email: { contains: search } },
    ];
  }

  try {
    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({
      enquiries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching admin enquiries:", error);
    return NextResponse.json({ error: "Failed to load enquiries" }, { status: 500 });
  }
}
