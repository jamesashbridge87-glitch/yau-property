import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "First Home Buyer Checklist — Your Aussie Uncle",
  description:
    "Your deposit is not your only cost. Get the free checklist that explains Australian property costs in plain English.",
  openGraph: {
    title: "First Home Buyer Checklist — Your Aussie Uncle",
    description:
      "Your deposit is not your only cost. Get the free checklist that explains Australian property costs in plain English.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
