import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
  },
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
