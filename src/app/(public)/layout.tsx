import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import EnquiryDrawer from "@/components/EnquiryDrawer";
import { getWebsiteSettings } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar
        phone={settings.phone}
        secondaryPhone={settings.secondaryPhone || undefined}
        whatsapp={settings.whatsappNumber}
      />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />

      {/* Floating WhatsApp and Call for desktop & tablet */}
      <WhatsAppFloatingButton
        phone={settings.phone}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Sticky Quick-Action Bar for mobile devices */}
      <MobileBottomBar
        phone={settings.phone}
        secondaryPhone={settings.secondaryPhone || undefined}
        whatsapp={settings.whatsappNumber}
      />

      {/* Global Slide-Over Enquiry Drawer */}
      <EnquiryDrawer />
    </div>
  );
}
