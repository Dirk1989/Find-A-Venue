import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Find A Venue | South Africa's Premium Venue Directory",
  description: "Discover curated wedding venues, corporate event spaces, and safari lodges across South Africa.",
  keywords: ["venues", "weddings", "corporate events", "safari lodges", "South Africa"],
  authors: [{ name: "Find A Venue" }],
  creator: "Find A Venue",
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-ivory text-charcoal">
        {children}
      </body>
    </html>
  );
}
