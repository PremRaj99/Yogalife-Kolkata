import Image from "next/image";
import { ayurvedaTherapies } from "@/lib/ayurveda";

export function AyurvedaSection() {
  return (
    <section id="ayurveda" className="section ayurveda-section" aria-labelledby="ayurveda-title">
      <div className="container">
        <div className="section-intro">
          <div>
            <h2 id="ayurveda-title">Natural healing for<br />body, mind and spirit.</h2>
          </div>
        </div>
        <ul className="ayurveda-grid">
          {ayurvedaTherapies.map(therapy => (
            <li key={therapy.title} className="ayurveda-card">
              <div className="ayurveda-image">
                <Image src={therapy.image} alt={therapy.title} fill sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw" />
              </div>
              <h3>{therapy.title}</h3>
              <p>{therapy.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
