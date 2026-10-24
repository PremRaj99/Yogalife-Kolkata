import type { Metadata } from "next";
import {
  PiEnvelopeThin,
  PiFacebookLogoThin,
  PiInstagramLogoThin,
  PiMapPinThin,
  PiPhoneThin,
  PiWhatsappLogoThin,
  PiXLogoThin,
} from "react-icons/pi";
import { HomeNavigation } from "@/components/home-navigation";
import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/ui";
import "../home.css";
import "../footer.css";
import "../contact.css";

export const metadata: Metadata = {
  title: "Contact Us | Visit Our Yoga Studio",
  description:
    "Get in touch with Yogalife Kolkata. Call, WhatsApp or email us, or find our studio on the map.",
  alternates: { canonical: "/contact" },
};

// Share link from Google Maps. For a pinned embed, replace mapEmbed with the
// src from Google Maps > Share > Embed a map.
const mapLink = "https://maps.app.goo.gl/XyoKGiLYqHpK9B569";
const mapEmbed = "https://maps.google.com/maps?q=Yogalife+Kolkata&z=15&output=embed";

const phone = "+91 95460 74242";
const email = "yogalifekolkata@gmail.com";
const whatsapp =
  "https://wa.me/919546074242?text=Hello%20Yogalife%20Kolkata!%20I%27d%20like%20to%20learn%20about%20your%20yoga%20programs.";

const details = [
  { icon: PiWhatsappLogoThin, label: "WhatsApp", value: "Chat with us", href: whatsapp },
  { icon: PiPhoneThin, label: "Call", value: phone, href: "tel:+919546074242" },
  { icon: PiEnvelopeThin, label: "Email", value: email, href: "mailto:" + email },
  { icon: PiMapPinThin, label: "Visit", value: "Open in Google Maps", href: mapLink },
];

const socials = [
  { icon: PiInstagramLogoThin, label: "Instagram", href: "https://www.instagram.com/yogalifekolkata" },
  { icon: PiFacebookLogoThin, label: "Facebook", href: "https://www.facebook.com/share/19Wox1VPcU/" },
  { icon: PiXLogoThin, label: "X (Twitter)", href: "https://x.com/Shambhu40287904" },
];

export default function Contact() {
  return (
    <div className="home-page" id="top">
      <HomeNavigation current="contact" />
      <main id="main">
        <section className="section contact-section" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Contact us</p>
              <h1 id="contact-title">
                Come say <em>hello.</em>
              </h1>
              <p className="contact-lead muted">
                Ask about yoga programs, beginner classes, Ayurveda or retreats. We&apos;ll help you find a
                starting point that feels right.
              </p>

              <ul className="contact-list">
                {details.map((item) => {
                  const external = item.href.startsWith("http");
                  return (
                    <li key={item.label}>
                      <a href={item.href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                        <Icon icon={item.icon} />
                        <span>
                          <small>{item.label}</small>
                          {item.value}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <ul className="contact-socials" aria-label="Social media">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                      <Icon icon={item.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-map">
              <iframe
                src={mapEmbed}
                title="Map showing the location of Yogalife Kolkata"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
