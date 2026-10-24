// Public site URL used for canonical links, sitemap, robots and social previews.
// Set NEXT_PUBLIC_SITE_URL in production, e.g. https://yogalifekolkata.com
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = "Yogalife Kolkata";

// Pages that set their own openGraph replace the root one, so they spread this in.
export const openGraphBase = {
  type: "website",
  locale: "en_IN",
  siteName,
} as const;
