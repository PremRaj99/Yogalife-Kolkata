"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";
import { stagger, useAnimate, useReducedMotion } from "motion/react";
import {
  PiArrowRightThin,
  PiHeartThin,
  PiLeafThin,
  PiSunThin,
} from "react-icons/pi";
import { Icon } from "./ui";
import { whatsappUrl } from "./navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const [scope, animate] = useAnimate<HTMLElement>();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const hero = scope.current;
    const headline = hero.querySelector<HTMLElement>(".home-headline");
    const grid = hero.querySelector<HTMLElement>(".home-hero-grid");
    if (!headline || !grid) return;
    let active = true;
    const playback: {
      current?: ReturnType<typeof animate>;
      fallback?: number;
    } = {};

    function finish() {
      playback.current?.stop();
      window.clearTimeout(playback.fallback);
      hero
        .querySelectorAll<HTMLElement>(
          ".home-headline, .home-headline-line, .home-headline-word, .home-hero-support, .home-hero-visual, .home-hero-cta, .home-hero-welcome, .home-cta-arrow-icon",
        )
        .forEach((element) => {
          element.style.setProperty("opacity", "1");
          element.style.setProperty("transform", "none");
          element.style.setProperty("filter", "none");
        });
      const arrow = hero.querySelector<HTMLElement>(".home-cta-arrow");
      arrow?.style.setProperty("width", "24px");
      arrow?.style.setProperty("margin-left", "28px");
      hero.setAttribute("data-hero-phase", "complete");
    }

    if (
      reduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finish();
      return;
    }

    hero
      .querySelectorAll<HTMLElement>(
        ".home-headline-word, .home-hero-support, .home-hero-visual, .home-hero-cta, .home-hero-welcome, .home-cta-arrow-icon",
      )
      .forEach((element) => element.style.setProperty("opacity", "0"));
    const arrow = hero.querySelector<HTMLElement>(".home-cta-arrow");
    arrow?.style.setProperty("width", "0px");
    arrow?.style.setProperty("margin-left", "0px");

    const lines = Array.from(
      hero.querySelectorAll<HTMLElement>(".home-headline-line"),
    );
    headline.style.setProperty("transform", "none");
    lines.forEach((line) => line.style.setProperty("transform", "none"));
    const headlineRect = headline.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const headerHeight =
      document.querySelector(".home-header")?.getBoundingClientRect().height ??
      0;
    const bottomNavHeight =
      document.querySelector(".home-mobile-nav")?.getBoundingClientRect()
        .height ?? 0;
    const introHeight = Math.max(
      240,
      window.innerHeight - headerHeight - bottomNavHeight,
    );
    const gutter = parseFloat(getComputedStyle(grid).paddingLeft);
    const introScale = Math.max(
      1,
      Math.min(
        1.55,
        (window.innerWidth - gutter * 2) / headlineRect.width,
        (introHeight * 0.55) / headlineRect.height,
      ),
    );
    const introX =
      gridRect.left +
      gridRect.width / 2 -
      (headlineRect.left + headlineRect.width / 2);
    const introY =
      headerHeight +
      introHeight / 2 -
      (headlineRect.top + headlineRect.height / 2);
    const lineOffsets = lines.map(
      (line) => (headlineRect.width - line.getBoundingClientRect().width) / 2,
    );
    headline.style.setProperty(
      "transform",
      "translate(" + introX + "px, " + introY + "px) scale(" + introScale + ")",
    );
    headline.style.setProperty("opacity", "1");
    lines.forEach((line, index) =>
      line.style.setProperty(
        "transform",
        "translateX(" + lineOffsets[index] + "px)",
      ),
    );
    hero.setAttribute("data-hero-phase", "running");

    playback.current = animate([
      [
        ".home-headline",
        {
          x: [introX, introX],
          y: [introY, introY],
          scale: [introScale, introScale],
        },
        { duration: 1.35, at: 0 },
      ],
      [
        ".home-headline-line:first-child",
        { x: [lineOffsets[0], lineOffsets[0]] },
        { duration: 1.35, at: 0 },
      ],
      [
        ".home-headline-line:last-child",
        { x: [lineOffsets[1], lineOffsets[1]] },
        { duration: 1.35, at: 0 },
      ],
      [
        ".home-headline-word",
        { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"], y: [14, 0] },
        { duration: 0.65, delay: stagger(0.12), ease, at: 0.1 },
      ],
      [
        ".home-headline",
        { x: [introX, 0], y: [introY, 0], scale: [introScale, 1] },
        { duration: 0.9, ease, at: 1.35 },
      ],
      [
        ".home-headline-line:first-child",
        { x: [lineOffsets[0], 0] },
        { duration: 0.9, ease, at: 1.35 },
      ],
      [
        ".home-headline-line:last-child",
        { x: [lineOffsets[1], 0] },
        { duration: 0.9, ease, at: 1.35 },
      ],
      [
        ".home-hero-support",
        { opacity: [0, 1], y: [24, 0] },
        { duration: 0.65, delay: stagger(0.14), ease, at: 2.25 },
      ],
      [
        ".home-hero-visual",
        { opacity: [0, 1], y: [36, 0] },
        { duration: 0.8, ease, at: 2.35 },
      ],
      [
        ".home-hero-cta",
        { opacity: [0, 1], y: [12, 0] },
        { duration: 0.35, ease, at: 3.2 },
      ],
      [
        ".home-cta-arrow",
        { width: [0, 24], marginLeft: [0, 28] },
        { duration: 0.4, ease, at: 3.65 },
      ],
      [
        ".home-cta-arrow-icon",
        { opacity: [0, 1], x: [-8, 0] },
        { duration: 0.25, ease, at: 4.05 },
      ],
      [
        ".home-hero-welcome",
        { opacity: [0, 1], y: [12, 0] },
        { duration: 0.45, ease, at: 4.15 },
      ],
    ]);
    playback.current.then(() => {
      if (active) finish();
    });
    playback.fallback = window.setTimeout(finish, 5200);
    // Mobile browsers fire resize when the address bar collapses; only stop on width changes.
    const startWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== startWidth) finish();
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      active = false;
      finish();
      window.removeEventListener("resize", onResize);
    };
  }, [animate, reduceMotion, scope]);

  return (
    <section ref={scope} className="home-hero" aria-labelledby="hero-title">
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <h1
            id="hero-title"
            className="home-headline"
            aria-label="Find your inner balance."
          >
            {[
              ["Find", "your"],
              ["inner", "balance."],
            ].map((line, lineIndex) => (
              <span
                className="home-headline-line"
                aria-hidden="true"
                key={lineIndex}
              >
                {line.map((word, index) => (
                  <span key={word}>
                    {index > 0 ? " " : ""}
                    <span className="home-headline-word">{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="home-hero-kicker home-hero-support">
            With Yogalife Kolkata
          </p>
          <p className="home-hero-description home-hero-support">
            Mindful movement. A quieter mind. Discover a gentle path to
            wellbeing, rooted in the wisdom of traditional yoga.
          </p>
          <a
            className="button home-hero-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Start your journey</span>
            <span className="home-cta-arrow" aria-hidden="true">
              <span className="home-cta-arrow-icon">
                <Icon icon={PiArrowRightThin} />
              </span>
            </span>
          </a>
          <div className="home-hero-welcome">
            <div className="home-welcome-symbols" aria-hidden="true">
              {[PiLeafThin, PiSunThin, PiHeartThin].map((icon, i) => (
                <span key={i}>
                  <Icon icon={icon} />
                </span>
              ))}
            </div>
            <p>
              <strong>A gentle place to begin.</strong>
              <span>Every body. Every experience level.</span>
            </p>
          </div>
        </div>
        <div className="home-hero-visual">
          <Image
            src="/images/yogalife-meditation.webp"
            alt="Warm illustration of an Indian woman meditating, framed by cream lotus petals and botanical leaves"
            width={1100}
            height={1100}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 52vw, 640px"
            preload
            className="home-hero-image"
          />
          <div className="home-art-caption">
            <span />
            Breathe in. Be here.
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
