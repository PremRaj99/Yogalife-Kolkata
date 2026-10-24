"use client";

import Image from "next/image";
import { PiFlowerLotusThin, PiWhatsappLogoThin } from "react-icons/pi";
import { Icon } from "./ui";
import { whatsappUrl } from "./navigation";

export function CtaSection() {
  return (
    <section id="get-started" className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-heading">
          <h2 id="cta-title">From your first breath<br />to a lasting practice.</h2>
          <p className="muted">Yoga, Ayurveda, naturopathy and retreats, guided in one place. Tell us where you are and we’ll help you find your next step.</p>
          <a className="button" href={whatsappUrl + "%20I%27d%20like%20to%20get%20started."} target="_blank" rel="noopener noreferrer">
            <Icon icon={PiWhatsappLogoThin} size="sm" />Talk to our team
          </a>
        </div>

        {/* Decorative panels: the centre figure rises above its card, like the reference layout */}
        <div className="cta-panels" aria-hidden="true">
          <div className="cta-panel cta-panel-side">
            <Image src="/images/ayurveda/Ayurvedic Oil Ritual Still Life.png" alt="" fill sizes="(max-width: 1023px) 0px, 30vw" />
          </div>
          <div className="cta-panel cta-panel-center">
            <div className="cta-figure">
              <Image src="/images/yogalife-meditation.webp" alt="" fill sizes="(max-width: 639px) 90vw, 420px" />
            </div>
            <div className="cta-chips">
              <span className="cta-chip cta-chip-icon"><Icon icon={PiFlowerLotusThin} /></span>
              <span className="cta-chip">Breathe</span>
              <span className="cta-chip cta-chip-accent">Begin</span>
            </div>
          </div>
          <div className="cta-panel cta-panel-side">
            <Image src="/images/retreats/Serene Riverside Ghat at Golden Hour.png" alt="" fill sizes="(max-width: 1023px) 0px, 30vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
