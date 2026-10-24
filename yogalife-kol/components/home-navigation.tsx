"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  PiArticleThin,
  PiBookOpenThin,
  PiCaretDownThin,
  PiEnvelopeThin,
  PiFlowerLotusThin,
  PiHeartThin,
  PiHouseThin,
  PiImagesThin,
  PiWhatsappLogoThin,
} from "react-icons/pi";
import {
  programGroups,
  teacherTraining,
  trainingCourses,
} from "@/lib/navigation-data";
import { whatsappUrl } from "./navigation";
import { Icon } from "./ui";
import { Sheet } from "./sheet";
import { WellnessArt } from "./wellness-art";

type Menu = "program" | "resources";
type Detail = { name: string; description: string };
type Panel = { kind: Menu } | { kind: "detail"; detail: Detail };

const contact: Detail = {
  name: "Contact us",
  description:
    "Ask about our yoga programs, beginner classes and wellness experiences in Kolkata. Our team can help you find a starting point that feels right for you.",
};
const resources = [
  {
    name: "Blog",
    description:
      "Connect with our team for yoga insights, mindful living resources and guidance for your practice.",
    icon: PiArticleThin,
    caption: "Yoga, wellbeing & everyday wisdom",
  },
  {
    name: "Gallery",
    description:
      "Ask our team about life at Yogalife Kolkata, our yoga community and retreat experiences.",
    icon: PiImagesThin,
    caption: "Moments from our yoga community",
  },
];

function ProgramMenu({ onSelect }: { onSelect: (detail: Detail) => void }) {
  function select(name: string) {
    onSelect({
      name,
      description:
        "Connect with our team to learn more about " +
        name +
        ", suitable options and upcoming schedules at Yogalife Kolkata.",
    });
  }
  return (
    <div className="home-program-grid">
      <div className="home-menu-group home-menu-feature">
        <div className="home-menu-art">
          <WellnessArt />
        </div>
        <h3>{programGroups[0].title}</h3>
        <p>A welcoming practice, wherever you begin.</p>
        <ul>
          {programGroups[0].programs.map((name) => (
            <li key={name}>
              <button onClick={() => select(name)}>{name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="home-menu-group home-training-group">
        <span className="home-menu-eyebrow">Learn. Practise. Share.</span>
        <ul>
          <li>
            <button
              className="home-training-title"
              onClick={() => select(teacherTraining)}
            >
              {teacherTraining}
            </button>
            <ul className="home-training-levels">
              {trainingCourses.map((name, index) => (
                <li key={name}>
                  <button
                    className="home-course-choice"
                    onClick={() => select(name)}
                  >
                    <span className="home-course-hours" aria-hidden="true">
                      {name.split("hr")[0]}
                      <small>HOUR</small>
                    </span>
                    <span>
                      <strong>{name}</strong>
                      <span className="home-course-description">
                        {
                          [
                            "Explore the foundations of yoga, a personal practice and the art of teaching.",
                            "Continue your study of movement, awareness and mindful teaching.",
                            "Deepen your understanding through a longer journey of yoga study.",
                          ][index]
                        }
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <p className="small muted home-training-note">
          Find your next step. Speak with our team about course details and
          upcoming schedules.
        </p>
      </div>
      <div className="home-menu-group home-menu-feature">
        <div className="home-menu-art">
          <Image
            src="/images/yogalife-meditation.webp"
            alt="Meditation surrounded by warm lotus petals"
            width={1100}
            height={1100}
            sizes="240px"
          />
        </div>
        <h3>{programGroups[1].title}</h3>
        <p>A little stillness. A more balanced everyday.</p>
        <ul>
          {programGroups[1].programs.map((name) => (
            <li key={name}>
              <button onClick={() => select(name)}>{name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResourcesMenu({ onSelect }: { onSelect: (detail: Detail) => void }) {
  return (
    <div className="home-resources-grid">
      {resources.map((resource) => (
        <button
          key={resource.name}
          className="home-resource-link"
          onClick={() => onSelect(resource)}
        >
          <Icon icon={resource.icon} />
          <span>
            <strong>{resource.name}</strong>
            <small>{resource.caption}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
function getScrollSnapshot() {
  return window.scrollY > 4;
}
function getServerScrollSnapshot() {
  return false;
}

export function HomeNavigation({
  current = "home",
}: {
  current?: "home" | "about";
}) {
  const homeHref = current === "home" ? "#top" : "/";
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  const [menu, setMenu] = useState<Menu | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(0);
  const [panel, setPanel] = useState<Panel | null>(null);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menu) return;
    function closeOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenu(null);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(null);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menu]);

  function showDetail(detail: Detail) {
    setMenu(null);
    setPanel({ kind: "detail", detail });
  }
  function placeMenu(button: HTMLButtonElement) {
    trigger.current = button;
    const bounds = button.getBoundingClientRect();
    setMenuAnchor(bounds.left + bounds.width / 2);
  }
  function showMobileMenu(kind: Menu) {
    setMenu(null);
    setPanel({ kind });
  }
  const panelTitle =
    panel?.kind === "detail"
      ? panel.detail.name
      : panel?.kind === "program"
        ? "Find your program."
        : "Resources";

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={"site-header home-header" + (scrolled ? " is-scrolled" : "")}
        ref={header}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setMenu(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMenu(null);
        }}
      >
        <div className="container header-inner">
          <Link
            className="home-logo"
            href={homeHref}
            aria-label="Yogalife Kolkata home"
          >
            <Image
              src="/kol-logo.png"
              alt="Yogalife Kolkata"
              width={842}
              height={595}
              sizes="144px"
              preload
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              href={homeHref}
              aria-current={current === "home" ? "page" : undefined}
              onPointerEnter={() => setMenu(null)}
            >
              Home
            </Link>
            <Link
              href="/about"
              aria-current={current === "about" ? "page" : undefined}
              onPointerEnter={() => setMenu(null)}
            >
              About
            </Link>
            <button
              className="nav-trigger"
              aria-expanded={menu === "program"}
              aria-controls="program-mega-menu"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  placeMenu(event.currentTarget);
                  setMenu("program");
                }
              }}
              onClick={(event) => {
                placeMenu(event.currentTarget);
                setMenu(menu === "program" ? null : "program");
              }}
            >
              Program <Icon icon={PiCaretDownThin} size="sm" />
            </button>
            <button
              className="nav-trigger"
              aria-expanded={menu === "resources"}
              aria-controls="resources-mega-menu"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  placeMenu(event.currentTarget);
                  setMenu("resources");
                }
              }}
              onClick={(event) => {
                placeMenu(event.currentTarget);
                setMenu(menu === "resources" ? null : "resources");
              }}
            >
              Resources <Icon icon={PiCaretDownThin} size="sm" />
            </button>
            <button
              className="nav-trigger"
              onPointerEnter={() => setMenu(null)}
              onClick={() => showDetail(contact)}
            >
              Contact Us
            </button>
          </nav>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.div
              key={menu}
              id={menu + "-mega-menu"}
              className="mega-menu home-mega-menu"
              style={{ "--menu-pointer-x": menuAnchor + "px" } as CSSProperties}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <nav
                className="home-mega-surface"
                aria-label={menu === "program" ? "Programs" : "Resources"}
              >
                {menu === "program" ? (
                  <ProgramMenu onSelect={showDetail} />
                ) : (
                  <ResourcesMenu onSelect={showDetail} />
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <nav
        className="mobile-nav home-mobile-nav"
        aria-label="Mobile navigation"
      >
        <Link
          href={homeHref}
          aria-current={current === "home" ? "page" : undefined}
        >
          <Icon icon={PiHouseThin} />
          Home
        </Link>
        <Link
          href="/about"
          aria-current={current === "about" ? "page" : undefined}
        >
          <Icon icon={PiHeartThin} />
          About
        </Link>
        <button onClick={() => showMobileMenu("program")}>
          <Icon icon={PiFlowerLotusThin} />
          Program
        </button>
        <button onClick={() => showMobileMenu("resources")}>
          <Icon icon={PiBookOpenThin} />
          Resources
        </button>
        <button onClick={() => showDetail(contact)}>
          <Icon icon={PiEnvelopeThin} />
          Contact Us
        </button>
      </nav>
      <Sheet
        key={panelTitle}
        open={panel !== null}
        onClose={() => setPanel(null)}
        title={panelTitle}
        description={
          panel?.kind === "detail" ? panel.detail.description : undefined
        }
      >
        {panel?.kind === "program" ? (
          <ProgramMenu onSelect={showDetail} />
        ) : panel?.kind === "resources" ? (
          <ResourcesMenu onSelect={showDetail} />
        ) : (
          <a
            className="secondary-button"
            href={
              panel?.kind === "detail"
                ? whatsappUrl +
                  "%20I%27d%20like%20to%20know%20more%20about%20" +
                  encodeURIComponent(panel.detail.name) +
                  "."
                : whatsappUrl
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={PiWhatsappLogoThin} size="sm" />
            Talk with Us
          </a>
        )}
      </Sheet>
    </>
  );
}
