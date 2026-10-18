import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getWebsiteSettings } from "@/lib/data";

// Public pages layout

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar phone={settings.phone} whatsapp={settings.whatsappNumber} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloatingButton whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
