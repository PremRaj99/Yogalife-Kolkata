import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PiPlusThin, PiWhatsappLogoThin } from "react-icons/pi";
import { HomeNavigation } from "@/components/home-navigation";
import { SiteFooter } from "@/components/site-footer";
import { whatsappUrl } from "@/components/navigation";
import { Icon } from "@/components/ui";
import { programPages } from "@/lib/program-pages";
import "../../home.css";
import "../../footer.css";
import "../../faq.css";
import "../../ttc.css";

type Props = { params: Promise<{ slug: string }> };

// Prerender every program; unknown slugs hit notFound() below.
export function generateStaticParams() {
  return programPages.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programPages.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: program.title + " in Kolkata",
    description: program.tagline,
    alternates: { canonical: "/programs/" + program.slug },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = programPages.find((p) => p.slug === slug);
  if (!program) notFound();

  const enquiry =
    whatsappUrl + "%20I%27d%20like%20to%20know%20more%20about%20" + encodeURIComponent(program.title) + ".";

  return (
    <div className="home-page" id="top">
      <HomeNavigation current="program" />
      <main id="main">
        <section className="section ttc-section" aria-labelledby="program-title">
          <div className="container">
            <div className="ttc-grid">
              <div>
                <div className="ttc-intro">
                  <div className="ttc-image">
                    <Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 767px) 100vw, 240px" preload />
                  </div>
                  <div>
                    <p className="eyebrow">{program.group ?? "Yoga for every stage"}</p>
                    <h1 id="program-title">{program.title}</h1>
                    <p className="ttc-tagline">{program.tagline}</p>
                  </div>
                </div>

                {program.intro.map((text) => (
                  <p key={text} className="ttc-body muted">{text}</p>
                ))}

                <div className="faq-list ttc-details">
                  {program.sections.map((section) => (
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

                {program.note && <p className="small muted">{program.note}</p>}
              </div>

              <aside className="ttc-aside" aria-label={program.title + " summary"}>
                <h2>Program highlights</h2>
                <ul>
                  {program.highlights.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h2>Who it&apos;s for</h2>
                <ul>
                  {program.audience.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="button ttc-apply" href={enquiry} target="_blank" rel="noopener noreferrer">
                  <Icon icon={PiWhatsappLogoThin} size="sm" />
                  Talk with us
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
