import { getDb } from "./mongodb";

// Blog posts are managed from /admin?tab=blog and stored in the "blogs" collection.
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  body: string;
  publishedAt: Date;
  updatedAt?: Date;
};

export const formatPostDate = (date: Date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

// Falls back to the start of the post (without Markdown symbols) when no summary was written.
export function postExcerpt(post: BlogPost) {
  if (post.excerpt) return post.excerpt;
  const text = post.body
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^(#{2,3}\s+|[-*]\s+|\d+\.\s+|>\s?)/gm, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? text.slice(0, 180).trimEnd() + "…" : text;
}

// The blog pages render an empty state instead of failing when the database is unreachable.
export async function listPosts() {
  try {
    const db = await getDb();
    return await db
      .collection<BlogPost>("blogs")
      .find()
      .sort({ publishedAt: -1 })
      .limit(100)
      .toArray();
  } catch {
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const db = await getDb();
    return await db.collection<BlogPost>("blogs").findOne({ slug });
  } catch {
    return null;
  }
}
