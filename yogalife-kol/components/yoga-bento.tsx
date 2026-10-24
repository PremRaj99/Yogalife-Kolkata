"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PiArrowUpRightThin, PiWhatsappLogoThin } from "react-icons/pi";
import { yogaPrograms, type YogaProgram, type YogaProgramId } from "@/lib/yoga-programs";
import { trainingCourses } from "@/lib/navigation-data";
import { ProgramIllustration } from "./program-illustration";
import { Sheet } from "./sheet";
import { Icon } from "./ui";
import { whatsappUrl } from "./navigation";

const MotionLink = motion.create(Link);

// Cards with a dedicated page link there; the rest open the enquiry sheet.
const programLinks: Partial<Record<YogaProgramId, string>> = {
  general: "/programs/group-yoga-training",
  private: "/programs/personal-yoga-training",
  training: "/ttc/200hr",
  workshops: "/#notices-events",
  consultation: "/contact",
  physiotherapy: "/programs/yoga-therapy",
  ayurveda: "/programs/ayurveda-consultation",
};

export function YogaBento() {
  const [selected, setSelected] = useState<YogaProgram | null>(null);
  const [training, setTraining] = useState<(typeof trainingCourses)[number]>("200hr TTC");
  const enquiry = selected?.id === "training" ? training : selected?.title ?? "yoga programs";
  return <section id="yoga-programs" className="section yoga-bento-section" aria-labelledby="yoga-programs-title">
    <div className="container">
      <div className="bento-section-heading">
        <h2 id="yoga-programs-title">A practice for every<br />part of your life.</h2>
        <p className="muted">From your first moment on the mat to a deeper path of learning. Find a little space for what you need, right where you are.</p>
      </div>
      <div className="yoga-bento-grid">
        {yogaPrograms.map(program => {
          const href = programLinks[program.id];
          const cardProps = { className: "yoga-bento-card bento-tone-"+program.tone+(program.id==="general"?" bento-featured":""), "aria-labelledby": "bento-title-"+program.id, "aria-describedby": "bento-description-"+program.id, whileHover: { y: -4 }, whileTap: { scale: 0.99 }, transition: { duration: 0.22 } };
          const content = <>
            <span className="bento-card-top"><span>{program.category}</span><Icon icon={PiArrowUpRightThin} size="sm" /></span>
            <div className="bento-art"><ProgramIllustration kind={program.id} /></div>
            <div className="bento-card-copy"><h3 id={"bento-title-"+program.id}>{program.title}</h3><p id={"bento-description-"+program.id}>{program.description}</p></div>
          </>;
          return href
            ? <MotionLink key={program.id} href={href} {...cardProps}>{content}</MotionLink>
            : <motion.button key={program.id} type="button" onClick={() => { setSelected(program); setTraining("200hr TTC"); }} {...cardProps}>{content}</motion.button>;
        })}
      </div>
    </div>
    <Sheet open={selected!==null} onClose={()=>setSelected(null)} title={selected?.title??"Explore a program"} description={selected?.detail}>
      {selected && <div className="bento-program-details"><span className="tag">{selected.category}</span>
        {selected.id==="training" && <div className="bento-training-options" role="group" aria-label="Teacher training course level">{trainingCourses.map(course=><button key={course} aria-pressed={training===course} onClick={()=>setTraining(course)}>{course}</button>)}</div>}
        <p className="small muted">Our team can help with suitable options, availability and your next step.</p>
        <a className="button" href={whatsappUrl+"%20I%27m%20interested%20in%20"+encodeURIComponent(enquiry)+"."} target="_blank" rel="noopener noreferrer"><Icon icon={PiWhatsappLogoThin} size="sm" />Ask about this program</a>
      </div>}
    </Sheet>
  </section>;
}
