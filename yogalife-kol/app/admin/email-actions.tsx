"use client";
import { useEffect, useRef, useState } from "react";

// Row checkboxes are plain inputs rendered by the server table; these helpers read them from the DOM.
const PICK = "input[data-pick]";
const picks = () => [...document.querySelectorAll<HTMLInputElement>(PICK)];

function useSelected(deps: unknown) {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setSelected(picks().filter((box) => box.checked).map((box) => box.value));
    update();
    document.addEventListener("change", update);
    return () => document.removeEventListener("change", update);
  }, [deps]);
  return selected;
}

export function SelectAll({ total }: { total: number }) {
  const ref = useRef<HTMLInputElement>(null);
  const count = useSelected(total).length;
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = count > 0 && count < total;
  }, [count, total]);
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Select all registrations"
      checked={total > 0 && count === total}
      onChange={(e) => {
        picks().forEach((box) => (box.checked = e.target.checked));
        document.dispatchEvent(new Event("change"));
      }}
    />
  );
}

// Acts on the selected rows, or on every shown row when nothing is selected.
// Emails go in BCC so registrants can't see each other's addresses.
export function EmailActions({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);
  const selected = useSelected(emails.join(","));
  const target = [...new Set(selected.length ? selected : emails)];
  const scope = selected.length ? "selected" : "all";
  const compose = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(target.join(","))}`;

  async function copy() {
    await navigator.clipboard.writeText(target.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button className="secondary-button" type="button" onClick={copy}>
        <span aria-live="polite">
          {copied ? "Copied" : `Copy ${target.length} ${scope === "selected" ? "selected " : ""}email${target.length === 1 ? "" : "s"}`}
        </span>
      </button>
      <a className="secondary-button" href={compose} target="_blank" rel="noopener noreferrer">
        Email {scope} (BCC)
      </a>
    </>
  );
}
