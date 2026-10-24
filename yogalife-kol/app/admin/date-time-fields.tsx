"use client";
import { useState } from "react";

type Mode = "day" | "month" | "upcoming" | "tba";

// Turns stored labels like "7:00 AM – 9:00 AM" back into <input type="time"> values.
function toTimeInputs(label: string) {
  return [...label.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi)].map(([, h, m, ap]) => {
    const hour = (Number(h) % 12) + (ap.toUpperCase() === "PM" ? 12 : 0);
    return `${String(hour).padStart(2, "0")}:${m}`;
  });
}

export function DateTimeFields({
  dateKey,
  datePrecision,
  dateLabel,
  time = "",
}: {
  dateKey?: string | null;
  datePrecision?: string;
  dateLabel?: string;
  time?: string;
}) {
  const initial: Mode = dateKey
    ? datePrecision === "month"
      ? "month"
      : "day"
    : dateLabel === "Upcoming"
      ? "upcoming"
      : "tba";
  const [mode, setMode] = useState<Mode>(initial);
  const [start = "", end = ""] = toTimeInputs(time);
  return (
    <>
      <label className="field">
        Date
        <select className="input" name="dateMode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="day">Specific date</option>
          <option value="month">Month only</option>
          <option value="upcoming">Upcoming</option>
          <option value="tba">To be announced</option>
        </select>
      </label>
      {mode === "day" && (
        <label className="field">
          Pick date
          <input className="input" type="date" name="day" required defaultValue={datePrecision === "day" ? (dateKey ?? "") : ""} />
        </label>
      )}
      {mode === "month" && (
        <label className="field">
          Pick month
          <input className="input" type="month" name="month" required defaultValue={dateKey?.slice(0, 7) ?? ""} />
        </label>
      )}
      {(mode === "upcoming" || mode === "tba") && <span aria-hidden="true" />}
      <label className="field">
        Start time
        <input className="input" type="time" name="startTime" defaultValue={start} />
      </label>
      <label className="field">
        End time (optional)
        <input className="input" type="time" name="endTime" defaultValue={end} />
      </label>
    </>
  );
}
