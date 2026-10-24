import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { HomeNavigation } from "@/components/home-navigation";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { formatPostDate, listPosts, postExcerpt } from "@/lib/blog";
import "../home.css";
import "../testimonials.css";
import "../cta.css";
import "../footer.css";
import "../blog.css";

export const metadata: Metadata = {
  title: "Blog | Yoga, Wellbeing & Everyday Wisdom",
  description:
    "Yoga insights, mindful living resources and guidance for your practice from Yogalife Kolkata.",
};

export default async function Blog() {
  // Posts change from the admin panel, so read them on every request.
  await connection();
  const posts = await listPosts();

  return (
    <div className="home-page" id="top">
      <HomeNavigation current="blog" />
      <main id="main">
        <section className="section blog-hero" aria-labelledby="blog-title">
          <div className="container">
            <p className="eyebrow">Blog</p>
            <h1 id="blog-title">Yoga, wellbeing &amp; everyday wisdom</h1>
          </div>
        </section>

        <section className="section blog-list" aria-label="Blog posts">
          <div className="container">
            {posts.length === 0 ? (
              <p className="muted">No posts yet. Check back soon.</p>
            ) : (
              <ul className="blog-grid">
                {posts.map((post) => (
                  <li key={post.slug} className="blog-card">
                    <Link href={`/blog/${post.slug}`}>
                      <time dateTime={post.publishedAt.toISOString()}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                      <h2>{post.title}</h2>
                      <p>{postExcerpt(post)}</p>
                      <span className="blog-read-more">Read more</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
