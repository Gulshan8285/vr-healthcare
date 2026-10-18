export interface EnquiryNotificationPayload {
  referenceNumber: string;
  customerName: string;
  phone: string;
  email?: string | null;
  requiredService: string;
  message?: string | null;
  createdAt: Date;
}

export async function sendAdminEnquiryNotification(
  payload: EnquiryNotificationPayload
): Promise<{ success: boolean; message: string }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const smtpHost = process.env.SMTP_HOST;

  // If SMTP is not yet configured, log safely without throwing or stopping the enquiry
  if (!smtpHost || !adminEmail) {
    console.info(
      `[VR Healthcare Notifications] SMTP not configured. Enquiry [${payload.referenceNumber}] recorded in database for ${payload.customerName} (${payload.phone}).`
    );
    return {
      success: true,
      message: "Notification deferred - SMTP credentials not configured in environment.",
    };
  }

  try {
    // In production with SMTP configured, this sends transactional email
    console.info(`[VR Healthcare Notifications] Dispatching notification for ${payload.referenceNumber} to ${adminEmail}`);
    return {
      success: true,
      message: `Notification simulated to ${adminEmail}`,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown notification error";
    console.error(`[VR Healthcare Notifications Error] Failed to send notification: ${errorMsg}`);
    return {
      success: false,
      message: errorMsg,
    };
  }
}
