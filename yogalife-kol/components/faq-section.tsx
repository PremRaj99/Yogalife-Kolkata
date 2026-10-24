import { PiPlusThin } from "react-icons/pi";
import { faqs } from "@/lib/faq";
import { Icon } from "./ui";

// Native <details> handles open/close and keyboard access without any JS.
export function FaqSection() {
  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div>
          <h2 id="faq-title">Questions,<br />answered.</h2>
          <p className="muted">Everything you need to know about our programs, therapies and wellness centre.</p>
        </div>
        <div className="faq-list">
          {faqs.map(faq => (
            <details key={faq.question} className="faq-item">
              <summary>
                <span>{faq.question}</span>
                <Icon icon={PiPlusThin} />
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
                {faq.list && <ul>{faq.list.map(item => <li key={item}>{item}</li>)}</ul>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
