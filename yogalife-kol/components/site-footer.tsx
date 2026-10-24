import Image from "next/image";

const whatsapp = "https://wa.me/919546074242";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About us", href: "/about" },
      { label: "Notices & events", href: "/#notices-events" },
      { label: "Yoga programs", href: "/#yoga-programs" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Wellness",
    links: [
      { label: "Naturopathy", href: "/#naturopathy" },
      { label: "Ayurveda", href: "/#ayurveda" },
      { label: "Retreats", href: "/#retreats" },
      { label: "Get started", href: "#get-started" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "WhatsApp", href: whatsapp },
      { label: "Instagram", href: "https://www.instagram.com/yogalifekolkata" },
      { label: "Facebook", href: "https://www.facebook.com/share/19Wox1VPcU/" },
      { label: "X (Twitter)", href: "https://x.com/Shambhu40287904" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-main">
            <a className="footer-logo" href="#top" aria-label="Yogalife Kolkata home">
              <Image src="/kol-logo-mono-white.png" alt="Yogalife Kolkata" width={842} height={595} sizes="160px" />
            </a>
            <div className="footer-columns">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h2>{col.title}</h2>
                  <ul>
                    {col.links.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <li key={link.label}>
                          <a href={link.href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
          <div className="footer-figure" aria-hidden="true">
            <Image src="/images/yogalife-breathing.png" alt="" fill sizes="(max-width: 900px) 0px, 360px" />
          </div>
        </div>

        <p className="footer-note">
          Yoga, Ayurveda and naturopathy at Yogalife Kolkata support general wellbeing and are not a substitute for
          medical diagnosis or treatment. Please consult a qualified doctor before starting any new practice,
          especially if you are pregnant or managing a health condition.
        </p>

        <div className="footer-bottom">
          <div>
            <p>© 2026 Yogalife Kolkata. All rights reserved.</p>
            <p><a href="#">Terms & Conditions</a> / <a href="#">Privacy Policy</a></p>
          </div>
          <p>
            Website by{" "}
            <a href="https://www.github.com/premraj99" target="_blank" rel="noopener noreferrer">Prem Raj</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
