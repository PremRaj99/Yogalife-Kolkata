"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import { naturopathyTherapies } from "@/lib/naturopathy";
import { Icon } from "./ui";

export function NaturopathyScroll() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Track whether the row is at either end so the arrow buttons can disable.
  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  // Move by exactly one card (plus gap) so scroll-snap lands cleanly.
  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>(".naturo-card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section id="naturopathy" className="section naturo-section" aria-labelledby="naturopathy-title">
      <div className="container">
        <div className="naturo-heading">
          <div>
            <h2 id="naturopathy-title">The healing<br />power of nature.</h2>
          </div>
          <div className="naturo-heading-side">
            <div className="naturo-controls">
              <button type="button" className="naturo-arrow" aria-label="Previous therapy" aria-controls="naturopathy-track" disabled={edges.start} onClick={() => scrollByCard(-1)}><Icon icon={PiArrowLeftThin} /></button>
              <button type="button" className="naturo-arrow" aria-label="Next therapy" aria-controls="naturopathy-track" disabled={edges.end} onClick={() => scrollByCard(1)}><Icon icon={PiArrowRightThin} /></button>
            </div>
          </div>
        </div>
      </div>
      <ul id="naturopathy-track" ref={trackRef} className="naturo-track" onScroll={updateEdges} tabIndex={0} aria-label="Naturopathy therapies, scroll horizontally">
        {naturopathyTherapies.map((therapy, index) => (
          <li key={therapy.id} className={"naturo-card bento-tone-" + therapy.tone}>
            <span className="bento-card-top"><span>{therapy.category}</span><span>{String(index + 1).padStart(2, "0")}</span></span>
            <span className="naturo-icon"><Image src={`/images/icons/${therapy.id}.png`} alt="" width={48} height={48} /></span>
            <div className="naturo-copy">
              <h3>{therapy.title}</h3>
              <p>{therapy.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
