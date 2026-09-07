import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moderna.uz"),
  title: {
    default: "Moderna Digital Agency | IT yechimlar",
    template: "%s | Moderna Digital Agency",
  },
  description: "Toshkentdagi Moderna Digital Agency: CRM, chatbot, mobil ilova, web platforma va biznes avtomatlashtirish yechimlari.",
  keywords: ["IT kompaniya Toshkent", "CRM tizimi", "web sayt yaratish", "mobil ilova", "Telegram bot", "biznes avtomatlashtirish"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://www.moderna.uz",
    siteName: "Moderna Digital Agency",
    title: "Moderna Digital Agency | IT yechimlar",
    description: "CRM, chatbot, mobil ilova, web platforma va biznes avtomatlashtirish yechimlari.",
    images: [{ url: "/moderna-logo.jpeg", width: 640, height: 640, alt: "Moderna Digital Agency" }],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Moderna Digital Agency",
              url: "https://www.moderna.uz",
              description: "CRM, chatbot, mobil ilova, web platforma va biznes avtomatlashtirish yechimlari.",
              areaServed: "Uzbekistan",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Toshkent",
                addressCountry: "UZ",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
