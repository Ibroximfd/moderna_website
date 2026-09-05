import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moderna Digital Agency | IT yechimlar",
  description: "CRM, chatbot, mobil ilova, web platforma va biznes avtomatlashtirish yechimlari.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
