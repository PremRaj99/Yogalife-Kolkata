import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { listPosts } from "@/lib/blog";
import { programPages } from "@/lib/program-pages";
import { siteUrl } from "@/lib/site";
import { ttcCourses } from "@/lib/ttc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Render per request so newly published blog posts show up without a rebuild.
  await connection();
  const posts = await listPosts();

  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const programs = programPages.map((p) => ({
    url: `${siteUrl}/programs/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const courses = ttcCourses.map((c) => ({
    url: `${siteUrl}/ttc/${c.level}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blog = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...programs, ...courses, ...blog];
}
