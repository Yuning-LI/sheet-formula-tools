import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Free AI Excel Formula Generator & Google Sheets Helper",
  description:
    "Turn text into Excel formulas instantly with our free AI tool. Supports Google Sheets and complex logic.",
  metadataBase: new URL("https://www.excelformulagenerator.net"),
  verification: {
    google: "-4U9BPQzZFi2agK6InT5xiD6N4gjALhz43Z9MFL_eiM",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Excel Formula Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.excelformulagenerator.net",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
