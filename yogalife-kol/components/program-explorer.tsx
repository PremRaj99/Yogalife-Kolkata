"use client";
import { useState } from "react";
import {
  PiArrowRightThin,
  PiMagnifyingGlassThin,
  PiCaretLeftThin,
  PiCaretRightThin,
} from "react-icons/pi";
import { usePrograms } from "@/lib/use-programs";
import type { Program } from "@/lib/schemas";
import { Button, Icon, Skeleton } from "./ui";
import { Sheet } from "./sheet";
import { whatsappUrl } from "./navigation";

export function ProgramExplorer() {
  const query = usePrograms();
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All"),
    [sort, setSort] = useState("recommended"),
    [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Program | null>(null);
  const filtered = (query.data ?? [])
    .filter(
      (p) =>
        (category === "All" || p.category === category) &&
        `${p.title} ${p.description}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : sort === "duration"
          ? a.duration - b.duration
          : a.id - b.id,
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 3)),
    current = Math.min(page, pages);
  return (
    <>
      <div className="toolbar">
        <div className="field">
          <label htmlFor="search">Search practices</label>
          <div className="search-wrap">
            <Icon icon={PiMagnifyingGlassThin} />
            <input
              id="search"
              className="input"
              type="search"
              placeholder="Find your own rhythm…"
              maxLength={100}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="category">Practice</label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {["All", "Yoga", "Mindfulness", "Wellness"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            className="input"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="name">Name A–Z</option>
            <option value="duration">Shortest first</option>
          </select>
        </div>
      </div>
      <div aria-busy={query.isPending}>
        {query.isPending ? (
          <div role="status" aria-label="Loading sample practices">
            {[1, 2, 3].map((i) => (
              <div className="program-row" key={i}>
                <Skeleton />
                <div>
                  <Skeleton width="60%" />
                  <Skeleton width="85%" />
                </div>
              </div>
            ))}
          </div>
        ) : query.isError ? (
          <div role="alert" className="empty-state">
            <p>We couldn’t load the examples.</p>
            <Button onClick={() => query.refetch()}>Try again</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" role="status">
            <h3>A little more space to explore.</h3>
            <p>No practices match your search.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filtered.slice((current - 1) * 3, current * 3).map((p) => (
            <article className="program-row" key={p.id}>
              <span className="program-number">0{p.id}</span>
              <div>
                <p>
                  {p.category} · {p.duration} min · Sample practice
                </p>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              <Button
                variant="secondary"
                aria-label={`Explore ${p.title}`}
                onClick={() => setSelected(p)}
              >
                Explore <Icon icon={PiArrowRightThin} size="sm" />
              </Button>
            </article>
          ))
        )}
      </div>
      <div className="pagination">
        <small role="status" aria-live="polite">
          {query.isSuccess
            ? `${filtered.length} practices · Page ${current} of ${pages}`
            : "Sample collection"}
        </small>
        <div className="row">
          <button
            className="icon-button"
            aria-label="Previous page"
            disabled={current === 1 || !query.isSuccess}
            onClick={() => setPage(current - 1)}
          >
            <Icon icon={PiCaretLeftThin} />
          </button>
          <button
            className="icon-button"
            aria-label="Next page"
            disabled={current === pages || !query.isSuccess}
            onClick={() => setPage(current + 1)}
          >
            <Icon icon={PiCaretRightThin} />
          </button>
        </div>
      </div>
      <Sheet
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Practice"}
        description="Design-system example. Ask the team about actual classes and availability."
      >
        {selected && (
          <>
            <span className="tag">
              {selected.category} · {selected.duration} minutes
            </span>
            <p style={{ marginTop: 24 }}>{selected.description}</p>
            <a
              className="button"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask us on WhatsApp <Icon icon={PiArrowRightThin} />
            </a>
          </>
        )}
      </Sheet>
    </>
  );
}
