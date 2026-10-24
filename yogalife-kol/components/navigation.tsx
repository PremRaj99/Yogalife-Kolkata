"use client";
import { useEffect, useRef, useState } from "react";
import {
  PiLeafThin,
  PiSquaresFourThin,
  PiHouseThin,
  PiPaletteThin,
  PiWhatsappLogoThin,
  PiCaretDownThin,
} from "react-icons/pi";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./ui";

export const whatsappUrl =
  "https://wa.me/919546074242?text=Hello%20Yogalife%20Kolkata!%20I%27d%20like%20to%20learn%20about%20your%20yoga%20programs.";
export function Brand() {
  return (
    <a className="brand" href="#top">
      <Icon icon={PiLeafThin} />
      <span>
        Yogalife<small>KOLKATA</small>
      </span>
    </a>
  );
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="site-header"
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            trigger.current?.focus();
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
        }}
      >
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#foundations">Foundations</a>
            <button
              ref={trigger}
              className="nav-trigger"
              aria-expanded={open}
              aria-controls="mega-menu"
              onClick={() => setOpen(!open)}
            >
              Explore the system <Icon icon={PiCaretDownThin} size="sm" />
            </button>
            <a href="#programs">Patterns</a>
            <a href="#principles">Our approach</a>
          </nav>
          <a className="secondary-button small" href="#components">
            View components ↗
          </a>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              id="mega-menu"
              className="mega-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setOpen(false);
              }}
            >
              <div className="container mega-grid">
                <div>
                  <span className="eyebrow">A considered foundation</span>
                  <h3>
                    Rooted in tradition.
                    <br />
                    Made for today.
                  </h3>
                  <p className="muted small">
                    A calm, consistent language for every Yogalife experience.
                  </p>
                </div>
                <div>
                  <strong>Visual language</strong>
                  <a href="#foundations">Colour & atmosphere</a>
                  <a href="#typography">Commissioner typography</a>
                  <a href="#spacing">Space & rhythm</a>
                </div>
                <div>
                  <strong>Interaction patterns</strong>
                  <a href="#components">Buttons, inputs & date picker</a>
                  <a href="#programs">Search, filter & pagination</a>
                  <a href="#feedback">Sheets & loading states</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {[
          { label: "Home", href: "#top", icon: PiHouseThin },
          { label: "Colours", href: "#foundations", icon: PiPaletteThin },
          { label: "Elements", href: "#components", icon: PiSquaresFourThin },
          { label: "Patterns", href: "#programs", icon: PiLeafThin },
        ].map((item) => (
          <a key={item.label} href={item.href}>
            <Icon icon={item.icon} />
            {item.label}
          </a>
        ))}
      </nav>
      <a
        className="button whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Yogalife Kolkata on WhatsApp"
      >
        <Icon icon={PiWhatsappLogoThin} />
        <span>Let’s talk</span>
      </a>
    </>
  );
}
