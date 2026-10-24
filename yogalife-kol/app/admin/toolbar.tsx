"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiMagnifyingGlassThin, PiSortAscendingThin } from "react-icons/pi";

export type SortOption = { value: string; label: string };

// GET form so it still works without JS; with JS, search and sort auto-apply.
export function Toolbar({
  tab,
  query,
  sort,
  options,
  placeholder,
}: {
  tab: string;
  query: string;
  sort: string;
  options: SortOption[];
  placeholder: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function apply() {
    clearTimeout(timer.current);
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form)) {
      if (typeof value === "string" && value.trim()) params.set(key, value.trim());
    }
    router.replace(`/admin?${params}`, { scroll: false });
  }

  return (
    <form
      ref={formRef}
      className="admin-toolbar"
      action="/admin"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      <input type="hidden" name="tab" value={tab} />
      <label className="admin-search">
        <span className="admin-sr-only">Search</span>
        <PiMagnifyingGlassThin aria-hidden="true" size={18} />
        <input
          className="input"
          type="search"
          name="q"
          maxLength={100}
          placeholder={placeholder}
          defaultValue={query}
          onChange={() => {
            clearTimeout(timer.current);
            timer.current = setTimeout(apply, 400);
          }}
        />
      </label>
      <label className="admin-sort">
        <span className="admin-sr-only">Sort by</span>
        <PiSortAscendingThin aria-hidden="true" size={18} />
        <select className="input" name="sort" defaultValue={sort} onChange={apply}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      {(query || sort !== options[0].value) && (
        <Link
          className="admin-clear"
          href={`/admin?tab=${tab}`}
          onClick={() => {
            // Inputs are uncontrolled, so reset them by hand
            clearTimeout(timer.current);
            const form = formRef.current;
            if (!form) return;
            (form.elements.namedItem("q") as HTMLInputElement).value = "";
            (form.elements.namedItem("sort") as HTMLSelectElement).value = options[0].value;
          }}
        >
          Clear
        </Link>
      )}
    </form>
  );
}
