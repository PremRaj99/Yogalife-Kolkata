import type { Metadata } from "next";
import Image from "next/image";
import { PiFlowerLotusThin } from "react-icons/pi";
import { HomeNavigation } from "@/components/home-navigation";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/ui";
import { leaders, teachers } from "@/lib/team";
import "../home.css";
import "../cta.css";
import "../footer.css";
import "../about.css";

export const metadata: Metadata = {
  title: "About Us | Yoga Teachers & Guides in Kolkata",
  description:
    "Meet the Yogalife Kolkata team: yoga gurus, therapists, Ayurveda practitioners and certified yoga teachers guiding mindful practice and holistic wellness in Kolkata.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "Rooted in tradition", text: "Yoga, Ayurveda and naturopathy taught with respect for their Indian origins." },
  { title: "Open to beginners", text: "Start where you are. Every practice is adapted to your pace and comfort." },
  { title: "Whole-person wellbeing", text: "Movement, breath, mind and daily habits, considered together." },
];

// The two gurus get editorial feature rows; the rest of the core team uses open list rows.
const founders = leaders.slice(0, 2);
const coreTeam = leaders.slice(2);

export default function About() {
  return (
    <div className="home-page" id="top">
      <HomeNavigation current="about" />
      <main id="main">
        <section className="section about-hero" aria-labelledby="about-title">
          <div className="container about-hero-grid">
            <div>
              <p className="eyebrow">About Yogalife Kolkata</p>
              <h1 id="about-title">
                A practice passed <em>hand to hand</em>, guru to student.
              </h1>
              <p className="about-lead muted">
                Yogalife Kolkata brings yoga, mindful movement and holistic wellbeing into everyday life. Our
                teachers, therapists and Ayurveda practitioners guide you at your own pace.
              </p>
            </div>
            <div className="about-collage">
              <div className="about-arch about-collage-main">
                <Image
                  src="/images/yogalife-meditation.webp"
                  alt="Illustration of a woman meditating in front of a cream lotus"
                  fill
                  sizes="(max-width: 767px) 70vw, 380px"
                  preload
                />
              </div>
              <div className="about-arch about-collage-small" aria-hidden="true">
                <Image
                  src="/images/retreats/Sunrise Yoga on the Sacred Ghats.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 35vw, 200px"
                />
              </div>
              <span className="about-collage-chip" aria-hidden="true">
                <Icon icon={PiFlowerLotusThin} size="sm" />
                Yoga · Ayurveda · Naturopathy
              </span>
            </div>
          </div>
        </section>

        <section className="section about-story cream" aria-labelledby="story-title">
          <div className="container about-story-grid">
            <div>
              <p className="eyebrow">Our approach</p>
              <h2 id="story-title" className="about-statement">
                We teach yoga the way it was meant to be lived.{" "}
                <span>Gently, consistently, and as part of every day.</span>
              </h2>
            </div>
            <ol className="about-principles">
              {principles.map((item) => (
                <li key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about-founders" aria-labelledby="founders-title">
          <div className="container">
            <div className="section-intro">
              <h2 id="founders-title">The gurus behind Yogalife</h2>
            </div>
            {founders.map((person, index) => (
              <article key={person.name} className={"about-founder" + (index % 2 ? " is-reversed" : "")}>
                <div className="about-arch about-founder-photo">
                  <Image src={person.image} alt={person.name} fill sizes="(max-width: 767px) 280px, 340px" />
                </div>
                <div>
                  <span className="about-founder-role">{person.role}</span>
                  <h3>{person.name}</h3>
                  <p className="muted">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-core" aria-labelledby="core-title">
          <div className="container">
            <div className="section-intro">
              <h2 id="core-title">Core team</h2>
              <p className="muted">Therapy, Ayurveda and teaching, guided by experienced practitioners.</p>
            </div>
            <ul className="about-team-list">
              {coreTeam.map((person) => (
                <li key={person.name} className="about-team-row">
                  <div className="about-team-photo">
                    <Image src={person.image} alt={person.name} fill sizes="88px" />
                  </div>
                  <div>
                    <h3>{person.name}</h3>
                    <span className="tag">{person.role}</span>
                  </div>
                  <p className="muted">{person.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section about-teachers cream" aria-labelledby="teachers-title">
          <div className="container">
            <div className="section-intro">
              <h2 id="teachers-title">Our yoga teachers</h2>
              <p className="muted">Certified Yoga Alliance teachers who lead our everyday classes.</p>
            </div>
            <ul className="about-teacher-grid">
              {teachers.map((teacher) => (
                <li key={teacher.name}>
                  <div className="about-arch about-teacher-photo">
                    <Image src={teacher.image} alt={teacher.name} fill sizes="(max-width: 639px) 45vw, 230px" />
                  </div>
                  <h3>{teacher.name}</h3>
                  <p className="small muted">{teacher.credential}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
