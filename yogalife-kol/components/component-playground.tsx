"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  PiLeafThin,
  PiArrowRightThin,
  PiSunThin,
  PiHeartThin,
  PiCalendarBlankThin,
  PiMagnifyingGlassThin,
  PiMapPinThin,
} from "react-icons/pi";
import { enquirySchema } from "@/lib/schemas";
import { Button, Field, Icon, Skeleton } from "./ui";
import { DatePicker } from "./date-picker";
import { Sheet } from "./sheet";
import { LoadingScreen } from "./loading-screen";

export function ComponentPlayground() {
  const [form, setForm] = useState({ name: "", email: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sheet, setSheet] = useState(false),
    [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaderTrigger = useRef<HTMLButtonElement>(null);
  const closeLoader = useRef<HTMLButtonElement>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (!loading) return;
    closeLoader.current?.focus();
    const trigger = loaderTrigger.current;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      trigger?.focus();
    };
  }, [loading]);
  function previewLoading() {
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), 2500);
  }
  return (
    <>
      <section id="components" className="section cream">
        <div className="container">
          <div className="section-intro">
            <div>
              <span className="eyebrow">03 / Elements</span>
              <h2>
                Small details.
                <br />A thoughtful experience.
              </h2>
            </div>
            <p className="muted">
              Clear actions, gentle depth and familiar controls. Everything has
              room to breathe.
            </p>
          </div>
          <div className="two-col">
            <div>
              <div className="component-block">
                <h3>Actions with intention</h3>
                <div className="row">
                  <Button onClick={() => setSheet(true)}>
                    Begin your journey <Icon icon={PiArrowRightThin} size="sm" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast("Take your time.", {
                        description:
                          "A quiet, helpful notification from Yogalife.",
                      })
                    }
                  >
                    Discover more
                  </Button>
                </div>
                <div className="row" style={{ marginTop: 24 }}>
                  <Button
                    variant="soft"
                    onClick={() =>
                      toast.success(
                        "A softer action, with a reassuring response.",
                      )
                    }
                  >
                    A softer action
                  </Button>
                  <Button disabled>Unavailable</Button>
                </div>
              </div>
              <div className="component-block">
                <h3>A light touch</h3>
                <div className="row">
                  {[
                    PiLeafThin,
                    PiSunThin,
                    PiHeartThin,
                    PiCalendarBlankThin,
                    PiMagnifyingGlassThin,
                    PiMapPinThin,
                  ].map((icon, i) => (
                    <Icon key={i} icon={icon} />
                  ))}
                </div>
                <p className="small muted" style={{ marginTop: 16 }}>
                  Phosphor thin icons · small 16px · medium 24px
                </p>
                <div className="row">
                  <span className="tag">Beginner friendly</span>
                  <span className="tag">Mindful movement</span>
                </div>
              </div>
              <div className="two-col" style={{ gap: 16 }}>
                <div className="surface">
                  <strong>Soft elevation</strong>
                  <p className="small muted" style={{ margin: "8px 0 0" }}>
                    An outer shadow, used sparingly.
                  </p>
                </div>
                <div className="surface inset">
                  <strong>Quiet depth</strong>
                  <p className="small muted" style={{ margin: "8px 0 0" }}>
                    Inset shadows for tactile controls.
                  </p>
                </div>
              </div>
            </div>
            <form
              className="surface feature"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const formElement = e.currentTarget;
                const result = enquirySchema.safeParse(form);
                if (!result.success) {
                  const next: Record<string, string> = {};
                  result.error.issues.forEach((issue) => {
                    next[String(issue.path[0])] ??= issue.message;
                  });
                  setErrors(next);
                  requestAnimationFrame(() =>
                    formElement
                      .querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]')
                      ?.focus(),
                  );
                  toast.error("Please check the highlighted fields.");
                  return;
                }
                setErrors({});
                toast.success("Your details look good.", {
                  description:
                    "This is a validation preview. No enquiry has been sent.",
                });
              }}
            >
              <span className="eyebrow">Form preview</span>
              <h3>A gentler first step.</h3>
              <p className="small muted">
                Try the fields and date picker. This example validates locally
                and sends no enquiry.
              </p>
              <div style={{ display: "grid", gap: 24 }}>
                <Field
                  id="name"
                  label="Your name"
                  autoComplete="name"
                  placeholder="What should we call you?"
                  maxLength={80}
                  value={form.name}
                  error={errors.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <DatePicker
                  value={form.date}
                  error={errors.date}
                  onChange={(date) => setForm({ ...form, date })}
                />
                <Button type="submit">
                  Check my details <Icon icon={PiArrowRightThin} size="sm" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section id="feedback" className="section">
        <div className="container">
          <div className="section-intro">
            <div>
              <span className="eyebrow">04 / Feedback & motion</span>
              <h2>Reassurance at every step.</h2>
            </div>
            <p className="muted">
              Calm transitions, honest feedback and a little breathing space
              while you wait.
            </p>
          </div>
          <div className="two-col">
            <div>
              <h3>Meet people where they are.</h3>
              <p className="muted">
                Centered sheets on desktop. A comfortable bottom drawer on
                mobile. Escape to close, with focus returned to where you left
                off.
              </p>
              <div className="row">
                <Button onClick={() => setSheet(true)}>Open a sheet</Button>
                <button
                  ref={loaderTrigger}
                  className="secondary-button"
                  onClick={previewLoading}
                >
                  Preview full-screen loading
                </button>
              </div>
            </div>
            <div aria-label="Skeleton preview">
              <span className="eyebrow">Content loading</span>
              <Skeleton width="48%" />
              <Skeleton width="90%" />
              <Skeleton width="72%" />
              <p className="small muted" style={{ marginTop: 24 }}>
                Subtle movement. A stable layout. Reduced motion respected.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Sheet
        open={sheet}
        onClose={() => setSheet(false)}
        title="Your practice, at your pace."
        description="A responsive sheet for focused decisions."
      >
        <p>
          Start with a small moment of stillness. There’s no perfect place to
          begin, only the place you are today.
        </p>
        <Button
          onClick={() => {
            setSheet(false);
            toast.success("A little intention goes a long way.");
          }}
        >
          That feels right <Icon icon={PiLeafThin} />
        </Button>
      </Sheet>
      {loading && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Loading preview"
          onKeyDown={(e) => {
            if (e.key === "Escape") setLoading(false);
            if (e.key === "Tab") {
              e.preventDefault();
              closeLoader.current?.focus();
            }
          }}
        >
          <LoadingScreen />
          <button
            ref={closeLoader}
            className="secondary-button"
            style={{
              position: "fixed",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 101,
            }}
            onClick={() => {
              if (timer.current) clearTimeout(timer.current);
              setLoading(false);
            }}
          >
            Close preview
          </button>
        </div>
      )}
    </>
  );
}
