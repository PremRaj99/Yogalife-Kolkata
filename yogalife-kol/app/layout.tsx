import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Providers } from "@/components/providers";
import { openGraphBase, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Yogalife Kolkata | Yoga & Wellness",
    template: "%s | Yogalife Kolkata",
  },
  description:
    "Explore yoga, mindful movement and holistic wellness with Yogalife Kolkata. A welcoming place to begin your yoga and health journey in Kolkata.",
  keywords: [
    "Yogalife",
    "yoga Kolkata",
    "beginner yoga",
    "wellness Kolkata",
    "holistic health",
    "meditation",
  ],
  icons: {
    icon: "/logo-lotus.png",
    apple: "/logo-lotus.png",
  },
  // Each page's title/description fill og:* and twitter:* automatically;
  // the image comes from app/opengraph-image.tsx.
  openGraph: openGraphBase,
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={commissioner.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
