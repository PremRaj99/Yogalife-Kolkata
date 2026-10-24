"use client";

import Image from "next/image";
import { PiArrowUpRightThin } from "react-icons/pi";
import { retreats } from "@/lib/retreats";
import { Icon } from "./ui";
import { whatsappUrl } from "./navigation";

export function RetreatsSection() {
  return (
    <section id="retreats" className="section retreats-section" aria-labelledby="retreats-title">
      <div className="container">
        <div className="section-intro">
          <div>
            <h2 id="retreats-title">Escape the noise.<br />Come back to yourself.</h2>
          </div>
        </div>
      </div>
      <ul className="retreats-track" tabIndex={0} aria-label="Retreat destinations, scroll horizontally">
        {retreats.map(retreat => (
          <li key={retreat.title} className="retreat-card">
            <div className="retreat-image">
              <Image src={retreat.image} alt={retreat.title + " retreat"} fill sizes="(max-width: 639px) 80vw, 340px" />
            </div>
            <span className="tag">{retreat.region}</span>
            <h3>{retreat.title}</h3>
            <p>{retreat.description}</p>
          </li>
        ))}
      </ul>
      <div className="container retreats-footer">
        <a className="secondary-button" href={whatsappUrl + "%20I%27m%20interested%20in%20a%20retreat."} target="_blank" rel="noopener noreferrer">
          Ask about upcoming retreats <Icon icon={PiArrowUpRightThin} size="sm" />
        </a>
      </div>
    </section>
  );
}
