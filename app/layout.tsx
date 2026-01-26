import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
};

export const metadata: Metadata = {
  title: "AI Excel Formula Generator | Free SheetFormula Tools",
  description: "Generate complex Excel and Google Sheets formulas instantly with AI. Free, no sign-up required. Simply describe your problem and get the formula.",
  keywords: ["excel formula generator", "google sheets formula AI", "spreadsheet AI", "excel help", "AI excel tools"],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        {children}
      </body>
      {/* 请务必将 G-XXXXXXXXXX 替换为您真实的 GA4 ID */}
      <GoogleAnalytics gaId="G-80WYD9170R" />
    </html>
  );
}