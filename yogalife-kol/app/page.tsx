import type { Metadata } from "next";
import { HomeNavigation } from "@/components/home-navigation";
import { HomeHero } from "@/components/home-hero";
import { NoticesEvents } from "@/components/notices-events";
import { YogaBento } from "@/components/yoga-bento";
import { NaturopathyScroll } from "@/components/naturopathy-scroll";
import { AyurvedaSection } from "@/components/ayurveda-section";
import { RetreatsSection } from "@/components/retreats-section";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import "./home.css";
import "./updates.css";
import "./programs-bento.css";
import "./naturopathy.css";
import "./ayurveda.css";
import "./retreats.css";
import "./faq.css";
import "./testimonials.css";
import "./cta.css";
import "./footer.css";
export const metadata: Metadata = {
  title: "Yoga in Kolkata | Find Your Inner Balance",
  description:
    "Begin your yoga journey with Yogalife Kolkata. Discover mindful movement, breathwork and traditional Indian wellness in a welcoming space for beginners.",
};
export default function Home() {
  return (
    <div className="home-page" id="top">
      <HomeNavigation />
      <main id="main">
        <HomeHero />
        <NoticesEvents />
        <YogaBento />
        <NaturopathyScroll />
        <AyurvedaSection />
        <RetreatsSection />
        <FaqSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
