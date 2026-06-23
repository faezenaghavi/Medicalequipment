import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MedEquip — Professional Medical Equipment Marketplace", template: "%s | MedEquip" },
  description: "Premium medical equipment for healthcare professionals. MRI, monitoring, surgical, respiratory, diagnostic and rehabilitation systems.",
  keywords: ["medical equipment", "MRI", "patient monitor", "surgical", "diagnostic", "FDA cleared"],
  openGraph: { siteName: "MedEquip", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}