// src/pages/Home.jsx
import HeroSection from "../components/home/HeroSection";
import NoticeBoard from "../components/home/NoticeBoard";
import ProgramsSection from "../components/home/ProgramsSection";
import NaturopathySection from "../components/home/NaturopathySection";
import AyurvedaSection from "../components/home/AyurvedaSection";
import RetreatsSection from "../components/home/RetreatsSection";
import FAQ from "../components/common/FAQ";
import Testimonial from "../components/common/Testimonial";
import CTA from "../components/common/CTA";
import SectionWrapper from "../components/layout/SectionWrapper";

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-slate-50">
      <HeroSection />
      <NoticeBoard />
      <ProgramsSection />
      <NaturopathySection />
      <AyurvedaSection />
      <RetreatsSection />
      <FAQ />
      <Testimonial />

      <CTA />
    </div>
  );
}