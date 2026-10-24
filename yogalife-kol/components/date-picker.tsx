"use client";
import { useId, useRef, useState } from "react";
import {
  PiCalendarBlankThin,
  PiCaretLeftThin,
  PiCaretRightThin,
} from "react-icons/pi";
import { Sheet } from "./sheet";
import { Button, Icon } from "./ui";

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(2020, i).toLocaleString("en-IN", { month: "long" }),
);
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function DatePicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date());
  const [focusDay, setFocusDay] = useState(1);
  const daysRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const today = new Date();
  const year = view.getFullYear(),
    month = view.getMonth();
  const count = new Date(year, month + 1, 0).getDate();
  const offset = new Date(year, month, 1).getDay();
  const choose = (date: Date) => {
    onChange(dateKey(date));
    setOpen(false);
  };
  function moveMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    if (next.getFullYear() >= 1900 && next.getFullYear() <= 2100) {
      setView(next);
      setFocusDay(1);
    }
  }
  return (
    <div className="field">
      <label id={`${id}-label`}>Preferred date</label>
      <button
        type="button"
        className="input row"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="dialog"
        data-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => {
          const d = value ? new Date(`${value}T12:00:00`) : new Date();
          setView(d);
          setFocusDay(d.getDate());
          setOpen(true);
        }}
      >
        <Icon icon={PiCalendarBlankThin} />
        <span id={`${id}-value`}>
          {value
            ? new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Choose a date"}
        </span>
      </button>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Make time for yourself"
        description="Jump to any month or year, or select today. Use arrow keys to move between days."
      >
        <Button variant="soft" onClick={() => choose(today)}>
          Today ·{" "}
          {today.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </Button>
        <div className="calendar-head">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous month"
            disabled={year === 1900 && month === 0}
            onClick={() => moveMonth(-1)}
          >
            <Icon icon={PiCaretLeftThin} />
          </button>
          <select
            aria-label="Month"
            className="input"
            value={month}
            onChange={(e) => {
              setView(new Date(year, Number(e.target.value), 1));
              setFocusDay(1);
            }}
          >
            {months.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            aria-label="Year"
            className="input"
            value={year}
            onChange={(e) => {
              setView(new Date(Number(e.target.value), month, 1));
              setFocusDay(1);
            }}
          >
            {Array.from({ length: 201 }, (_, i) => 1900 + i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <button
            type="button"
            className="icon-button"
            aria-label="Next month"
            disabled={year === 2100 && month === 11}
            onClick={() => moveMonth(1)}
          >
            <Icon icon={PiCaretRightThin} />
          </button>
        </div>
        <div
          className="calendar-grid"
          ref={daysRef}
          role="group"
          aria-label={`${months[month]} ${year}`}
        >
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <small aria-hidden="true" key={d}>
              {d}
            </small>
          ))}
          {Array.from({ length: offset }, (_, i) => (
            <span key={`empty-${i}`} />
          ))}
          {Array.from({ length: count }, (_, i) => {
            const day = i + 1,
              date = new Date(year, month, day),
              key = dateKey(date);
            return (
              <button
                type="button"
                key={key}
                data-day={day}
                className="day"
                tabIndex={focusDay === day ? 0 : -1}
                aria-label={date.toLocaleDateString("en-IN", {
                  dateStyle: "full",
                })}
                aria-pressed={value === key}
                aria-current={dateKey(today) === key ? "date" : undefined}
                onClick={() => choose(date)}
                onKeyDown={(e) => {
                  const delta = (
                    {
                      ArrowLeft: -1,
                      ArrowRight: 1,
                      ArrowUp: -7,
                      ArrowDown: 7,
                    } as Record<string, number>
                  )[e.key];
                  if (
                    delta !== undefined ||
                    e.key === "Home" ||
                    e.key === "End"
                  ) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 1
                        : e.key === "End"
                          ? count
                          : Math.max(1, Math.min(count, day + delta));
                    setFocusDay(next);
                    daysRef.current
                      ?.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)
                      ?.focus();
                  }
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}
