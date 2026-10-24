import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiPlusThin, PiWhatsappLogoThin } from "react-icons/pi";
import { HomeNavigation } from "@/components/home-navigation";
import { SiteFooter } from "@/components/site-footer";
import { whatsappUrl } from "@/components/navigation";
import { Icon } from "@/components/ui";
import { ttcCourses } from "@/lib/ttc";
import "../../home.css";
import "../../footer.css";
import "../../faq.css";
import "../../ttc.css";

type Props = { params: Promise<{ level: string }> };

// The three course levels are prerendered; unknown slugs hit notFound() below.
export function generateStaticParams() {
  return ttcCourses.map((course) => ({ level: course.level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  const course = ttcCourses.find((c) => c.level === level);
  if (!course) return {};
  return { title: course.title + " in Kolkata", description: course.tagline };
}

export default async function TtcPage({ params }: Props) {
  const { level } = await params;
  const course = ttcCourses.find((c) => c.level === level);
  if (!course) notFound();

  const enquiry = whatsappUrl + "%20I%27d%20like%20to%20apply%20for%20the%20" + encodeURIComponent(course.title) + ".";

  return (
    <div className="home-page" id="top">
      <HomeNavigation current="ttc" />
      <main id="main">
        <section className="section ttc-section" aria-labelledby="ttc-title">
          <div className="container">
            <nav className="ttc-tabs" aria-label="Teacher training levels">
              {ttcCourses.map((c) => (
                <Link
                  key={c.level}
                  href={"/ttc/" + c.level}
                  aria-current={c.level === course.level ? "page" : undefined}
                >
                  {c.level}
                </Link>
              ))}
            </nav>

            <div className="ttc-grid">
              <div>
                <div className="ttc-intro">
                  <div className="ttc-image">
                    <Image src={course.image} alt={course.imageAlt} fill sizes="(max-width: 767px) 100vw, 240px" preload />
                  </div>
                  <div>
                    <p className="eyebrow">Teacher training · {course.hours} hours</p>
                    <h1 id="ttc-title">{course.title}</h1>
                    <p className="ttc-tagline">{course.tagline}</p>
                  </div>
                </div>

                {course.intro.map((text) => (
                  <p key={text} className="ttc-body muted">{text}</p>
                ))}

                <div className="faq-list ttc-details">
                  {course.sections.map((section) => (
                    <details key={section.title} className="faq-item">
                      <summary>
                        <span>{section.title}</span>
                        <Icon icon={PiPlusThin} />
                      </summary>
                      <div className="faq-answer">
                        <ul>
                          {section.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </details>
                  ))}
                </div>

                <h2 className="ttc-subheading">Upcoming batches</h2>
                <p className="muted">Batch dates are shared on our noticeboard and directly by our team.</p>
                <Link className="button soft" href="/#notices-events">See notices & events</Link>
              </div>

              <aside className="ttc-aside" aria-label={course.title + " summary"}>
                <h2>{course.highlightsTitle}</h2>
                <ul>
                  {course.highlights.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h2>Who can apply</h2>
                <ul>
                  {course.prerequisites.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="button ttc-apply" href={enquiry} target="_blank" rel="noopener noreferrer">
                  <Icon icon={PiWhatsappLogoThin} size="sm" />
                  Apply now
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
