import { testimonials } from "@/lib/testimonials";

const initials = (name: string) => name.split(" ").map(part => part[0]).slice(0, 2).join("");

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="bento-section-heading">
          <h2 id="testimonials-title">Loved by our<br />community.</h2>
          <p className="muted">Hear directly from our members about their journey to wellness and peace.</p>
        </div>
        <ul className="testimonials-masonry">
          {testimonials.map((item, index) => (
            <li key={index} className="testimonial-card">
              {item.type === "video" ? (
                <video className="testimonial-video" src={item.src} controls preload="metadata" aria-label={`Member video testimonial ${index + 1}`} />
              ) : (
                <figure>
                  <figcaption className="testimonial-author">
                    <span className="testimonial-avatar" aria-hidden="true">{initials(item.name)}</span>
                    <span><strong>{item.name}</strong><small>{item.source}</small></span>
                  </figcaption>
                  <blockquote>{item.text}</blockquote>
                </figure>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
