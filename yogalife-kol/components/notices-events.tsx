"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  PiArrowRightThin,
  PiArrowUpRightThin,
  PiCalendarBlankThin,
  PiCaretLeftThin,
  PiCaretRightThin,
  PiClockThin,
  PiMagnifyingGlassThin,
  PiMapPinThin,
  PiMegaphoneThin,
} from "react-icons/pi";
import { useNoticesEvents } from "@/lib/use-notices-events";
import { compareTimelineEntries, isPastEntry } from "@/lib/event-feed";
import { timelineFiltersSchema, type TimelineEntry } from "@/lib/event-schemas";
import { Icon, Button, Skeleton } from "./ui";
import { Sheet } from "./sheet";
import { whatsappUrl } from "./navigation";

const pageSize = 4;
const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function TimelineDate({ item }: { item: TimelineEntry }) {
  const parts = item.dateKey?.split("-");
  return (
    <time
      className="updates-date"
      dateTime={
        item.dateKey
          ? item.datePrecision === "month"
            ? item.dateKey.slice(0, 7)
            : item.dateKey
          : undefined
      }
      aria-label={item.dateLabel}
    >
      <strong>
        {!parts
          ? "SOON"
          : item.datePrecision === "month"
            ? monthNames[Number(parts[1]) - 1]
            : Number(parts[2])}
      </strong>
      <span>
        {!parts
          ? "Dates TBA"
          : item.datePrecision === "month"
            ? parts[0]
            : monthNames[Number(parts[1]) - 1] + " · " + parts[0]}
      </span>
    </time>
  );
}

function EntryMeta({ item }: { item: TimelineEntry }) {
  return (
    <div className="updates-meta">
      {item.time && (
        <span>
          <Icon icon={PiClockThin} size="sm" />
          {item.time}
        </span>
      )}
      {item.location && (
        <span>
          <Icon icon={PiMapPinThin} size="sm" />
          {item.location}
        </span>
      )}
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div
      className="updates-loading"
      role="status"
      aria-label="Loading notices and events"
    >
      {[1, 2, 3].map((number) => (
        <div className="updates-skeleton-row" key={number}>
          <Skeleton width="64px" />
          <div>
            <Skeleton width="32%" />
            <Skeleton width="78%" />
            <Skeleton />
            <Skeleton width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NoticesEvents() {
  const query = useNoticesEvents();
  const [kind, setKind] = useState<"all" | "notice" | "event">("all");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [sort, setSort] = useState<"upcoming" | "newest">("upcoming");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<TimelineEntry | null>(null);
  const data = query.data;
  const items = data?.items ?? [];
  const today = data?.today ?? "";
  const filtered = items
    .filter(
      (item) =>
        (kind === "all" || item.kind === kind) &&
        [item.title, item.description, item.location, item.dateLabel]
          .join(" ")
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) => compareTimelineEntries(a, b, today, sort));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const selectedIsPast = selected ? isPastEntry(selected, today) : false;

  function resetFilters() {
    setKind("all");
    setSearch("");
    setSearchError("");
    setSort("upcoming");
    setPage(1);
  }

  return (
    <section
      id="notices-events"
      className="section updates-section"
      aria-labelledby="updates-title"
    >
      <div className="container updates-layout">
        <div className="updates-intro">
          <h2 id="updates-title">Notice & events</h2>
          <p className="muted">
            News from our community, moments to look forward to, and a little
            inspiration for your next step.
          </p>
          <a
            className="secondary-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask about an event <Icon icon={PiArrowUpRightThin} size="sm" />
          </a>
          <div className="updates-key">
            <span>
              <i className="updates-key-dot" />
              Notices & announcements
            </span>
            <span>
              <Icon icon={PiCalendarBlankThin} size="sm" />
              Events & gatherings
            </span>
          </div>
        </div>
        <div className="updates-board">
          <div className="updates-controls">
            <div
              className="updates-filters"
              role="group"
              aria-label="Filter updates"
            >
              {(
                [
                  { value: "all", label: "All updates" },
                  { value: "notice", label: "Notices" },
                  { value: "event", label: "Events" },
                ] as const
              ).map((filter) => (
                <button
                  key={filter.value}
                  aria-pressed={kind === filter.value}
                  onClick={() => {
                    setKind(filter.value);
                    setPage(1);
                  }}
                >
                  {filter.label}
                  <span>
                    {filter.value === "all"
                      ? items.length
                      : items.filter((item) => item.kind === filter.value)
                          .length}
                  </span>
                </button>
              ))}
            </div>
            <div className="updates-tools">
              <label className="updates-search">
                <Icon icon={PiMagnifyingGlassThin} size="sm" />
                <span className="updates-sr-only">
                  Search notices and events
                </span>
                <input
                  type="search"
                  placeholder="Find an update…"
                  maxLength={100}
                  value={search}
                  aria-invalid={!!searchError}
                  aria-describedby={
                    searchError ? "updates-search-error" : undefined
                  }
                  onChange={(event) => {
                    const result = timelineFiltersSchema.shape.search.safeParse(
                      event.target.value,
                    );
                    if (result.success) {
                      setSearch(event.target.value);
                      setSearchError("");
                      setPage(1);
                    } else setSearchError(result.error.issues[0].message);
                  }}
                />
              </label>
              <label className="updates-sort">
                <span className="updates-sr-only">Sort updates</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    const result = timelineFiltersSchema.shape.sort.safeParse(
                      event.target.value,
                    );
                    if (result.success) {
                      setSort(result.data);
                      setPage(1);
                    }
                  }}
                >
                  <option value="upcoming">Upcoming first</option>
                  <option value="newest">Newest first</option>
                </select>
              </label>
            </div>
            {searchError && (
              <p id="updates-search-error" className="field-error">
                {searchError}
              </p>
            )}
          </div>
          <div aria-busy={query.isPending}>
            {query.isPending ? (
              <TimelineSkeleton />
            ) : query.isError ? (
              <div className="updates-empty" role="alert">
                <h3>A small pause.</h3>
                <p>We couldn’t load the noticeboard. Please try again.</p>
                <Button variant="secondary" onClick={() => query.refetch()}>
                  Try again <Icon icon={PiArrowRightThin} size="sm" />
                </Button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="updates-empty">
                <Icon icon={PiMagnifyingGlassThin} />
                <h3>No updates found.</h3>
                <p>
                  {items.length
                    ? "Try another search or explore all our updates."
                    : "Our next community updates will appear here."}
                </p>
                {items.length > 0 && (
                  <Button variant="secondary" onClick={resetFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="updates-feed-status">
                  <p role="status" aria-live="polite">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "update" : "updates"}
                    {data?.staleFeeds.length
                      ? " · Showing saved updates"
                      : " · From our community"}
                  </p>
                  {!!data?.staleFeeds.length && (
                    <button
                      className="secondary-button"
                      disabled={query.isFetching}
                      onClick={() => query.refetch()}
                    >
                      {query.isFetching ? "Refreshing…" : "Refresh"}
                    </button>
                  )}
                </div>
                <ol className="updates-timeline">
                  {visible.map((item) => {
                    const past = isPastEntry(item, today);
                    const excerpt = item.description.replace(/\s+/g, " ");
                    return (
                      <motion.li
                        className={"updates-entry" + (past ? " is-past" : "")}
                        key={item.id}
                        initial={{ opacity: 0.85, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.35 }}
                      >
                        <TimelineDate item={item} />
                        <span className="updates-node" aria-hidden="true">
                          <Icon
                            icon={
                              item.kind === "notice"
                                ? PiMegaphoneThin
                                : PiCalendarBlankThin
                            }
                            size="sm"
                          />
                        </span>
                        <article className="updates-content">
                          <div className="updates-labels">
                            <span
                              className={
                                "tag " + (past ? "updates-past-tag" : "")
                              }
                            >
                              {item.kind === "notice"
                                ? "Notice"
                                : past
                                  ? "Past event"
                                  : "Event"}
                            </span>
                            {!past &&
                              item.kind === "event" &&
                              !item.dateKey && (
                                <span className="small muted">
                                  Dates to be announced
                                </span>
                              )}
                          </div>
                          <h3>
                            <button
                              className="updates-title-button"
                              onClick={() => setSelected(item)}
                            >
                              {item.title}
                            </button>
                          </h3>
                          <p>
                            {excerpt.length > 190
                              ? excerpt.slice(0, 187).replace(/\s+\S*$/, "") +
                                "…"
                              : excerpt}
                          </p>
                          <EntryMeta item={item} />
                          <button
                            className="secondary-button updates-detail-link"
                            aria-label={"View details for " + item.title}
                            onClick={() => setSelected(item)}
                          >
                            View details{" "}
                            <Icon icon={PiArrowRightThin} size="sm" />
                          </button>
                        </article>
                      </motion.li>
                    );
                  })}
                </ol>
                <div className="updates-pagination">
                  <span>
                    Showing {(currentPage - 1) * pageSize + 1}–
                    {Math.min(currentPage * pageSize, filtered.length)} of{" "}
                    {filtered.length}
                  </span>
                  {pages > 1 && (
                    <nav aria-label="Updates pagination">
                      <button
                        className="icon-button"
                        aria-label="Previous updates"
                        disabled={currentPage === 1}
                        onClick={() => setPage(currentPage - 1)}
                      >
                        <Icon icon={PiCaretLeftThin} />
                      </button>
                      <span>
                        Page {currentPage} of {pages}
                      </span>
                      <button
                        className="icon-button"
                        aria-label="Next updates"
                        disabled={currentPage === pages}
                        onClick={() => setPage(currentPage + 1)}
                      >
                        <Icon icon={PiCaretRightThin} />
                      </button>
                    </nav>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Update details"}
        description={selected?.dateLabel}
      >
        {selected && (
          <div className="updates-sheet-content">
            <span className="tag">
              {selected.kind === "notice"
                ? "Community notice"
                : selectedIsPast
                  ? "Past event"
                  : "Upcoming event"}
            </span>
            <EntryMeta item={selected} />
            <p className="updates-full-description">{selected.description}</p>
            {selectedIsPast ? (
              <p className="updates-history-note">
                This event date has passed. These details are part of our
                community archive.
              </p>
            ) : selected.kind === "event" && !selected.registrationUrl ? (
              <p className="updates-history-note">
                Dates and registration details will be announced soon.
              </p>
            ) : null}
            <div className="row">
              {selected.kind === "event" &&
                !selectedIsPast &&
                selected.registrationUrl && (
                  <a
                    className="button"
                    href={selected.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open registration{" "}
                    <Icon icon={PiArrowUpRightThin} size="sm" />
                  </a>
                )}
              <a
                className="secondary-button"
                href={
                  whatsappUrl +
                  "%20I%27d%20like%20to%20know%20more%20about%20" +
                  encodeURIComponent(selected.title) +
                  "."
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask our team <Icon icon={PiArrowUpRightThin} size="sm" />
              </a>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  );
}
