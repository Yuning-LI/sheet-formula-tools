import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.excelformulagenerator.net'),
  title: "Free AI Excel Formula Generator & Google Sheets Helper",
  description: "Generate complex Excel and Google Sheets formulas instantly with AI. Free, no sign-up required. Simply describe your problem and get the formula.",
  keywords: ["excel formula generator", "google sheets formula AI", "spreadsheet AI", "excel help", "AI excel tools"],
  alternates: {
    canonical: 'https://www.excelformulagenerator.net',
  },
  verification: {
    google: '-4U9BPQzZFi2agK6InT5xiD6N4gjALhz43Z9MFL_eiM',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Excel Formula Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://www.excelformulagenerator.net',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const enableAnalytics = process.env.NODE_ENV === 'production';

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </head>
      <body className="bg-slate-50 antialiased font-sans">
        {children}
      </body>
      {enableAnalytics && <GoogleAnalytics gaId="G-80WYD9170R" />}
    </html>
  );
}
