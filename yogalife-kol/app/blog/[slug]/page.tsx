import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { HomeNavigation } from "@/components/home-navigation";
import { CtaSection } from "@/components/cta-section";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { SiteFooter } from "@/components/site-footer";
import { formatPostDate, getPost, postExcerpt } from "@/lib/blog";
import { openGraphBase } from "@/lib/site";
import "../../home.css";
import "../../cta.css";
import "../../footer.css";
import "../../blog.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const post = await getPost((await params).slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  const description = postExcerpt(post);
  return {
    // The root title template already appends "| Yogalife Kolkata".
    title: post.title,
    description,
    alternates: { canonical: "/blog/" + post.slug },
    openGraph: {
      ...openGraphBase,
      type: "article",
      title: post.title,
      description,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: post.author ? [post.author] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  await connection();
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="home-page" id="top">
      <HomeNavigation current="blog" />
      <main id="main">
        <article className="section blog-post" aria-labelledby="post-title">
          <div className="container blog-post-inner">
            <Link href="/blog" className="blog-back">
              ← All posts
            </Link>
            <h1 id="post-title">{post.title}</h1>
            <p className="blog-meta">
              <time dateTime={post.publishedAt.toISOString()}>
                {formatPostDate(post.publishedAt)}
              </time>
              {post.author && <> · {post.author}</>}
            </p>
            <div className="blog-body">
              {/* Raw HTML in posts is ignored, and sanitize strips unsafe links/attributes. */}
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                {post.body}
              </Markdown>
            </div>
          </div>
        </article>
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
