import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://property.youraussieuncle.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "First Home Buyer Checklist | Your Aussie Uncle",
  description:
    "Your deposit is not your only cost. Get the free checklist that explains Australian property costs in plain English.",
  openGraph: {
    title: "First Home Buyer Checklist | Your Aussie Uncle",
    description:
      "Your deposit is not your only cost. Get the free checklist that explains Australian property costs in plain English.",
    url: SITE_URL,
    siteName: "Your Aussie Uncle",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/hero.jpg`,
        width: 1200,
        height: 675,
        alt: "James, Your Aussie Uncle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "First Home Buyer Checklist | Your Aussie Uncle",
    description:
      "Your deposit is not your only cost. Get the free checklist that explains Australian property costs in plain English.",
    images: [`${SITE_URL}/hero.jpg`],
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
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
