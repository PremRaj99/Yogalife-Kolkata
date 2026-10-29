import Papa from "papaparse";
import type { TimelineEntry } from "./event-schemas";

export type FeedRow = Record<string, string>;

export function parseFeedCsv(csv: string): FeedRow[] {
  const result = Papa.parse<FeedRow>(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.replace(/^\uFEFF/, "").trim(),
  });
  if (result.errors.length || !result.meta.fields?.includes("title")) {
    throw new Error("The published feed could not be read.");
  }
  return result.data;
}

export function plainFeedText(value: string) {
  const text = /<\/?[a-z][^>]*>/i.test(value)
    ? value.replace(/\s+/g, " ")
    : value.replace(/\r\n?/g, "\n");
  return text
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(?:p|div|ul|ol|li|br|h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseFeedDate(
  value: string,
): Pick<TimelineEntry, "dateKey" | "datePrecision"> {
  const empty = { dateKey: null, datePrecision: "unknown" } as const;
  const text = value.trim();
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  const named = /^([a-z]+)\s+(?:(\d{1,2}),?\s+)?(\d{4})$/i.exec(text);
  if (!iso && !named) return empty;
  const year = Number(iso?.[1] ?? named?.[3]);
  const month = iso
    ? Number(iso[2]) - 1
    : months.indexOf(named![1].slice(0, 3).toLowerCase());
  const day = Number(iso?.[3] ?? named?.[2] ?? 1);
  if (month < 0 || month > 11 || year < 1900 || year > 2200) return empty;
  const date = new Date(Date.UTC(year, month, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month ||
    date.getUTCDate() !== day
  )
    return empty;
  return {
    dateKey: date.toISOString().slice(0, 10),
    datePrecision: iso || named?.[2] ? "day" : "month",
  };
}

export function normalizeFeedRows(
  rows: FeedRow[],
  kind: TimelineEntry["kind"],
): TimelineEntry[] {
  const seen = new Set<string>();
  return rows.flatMap((row, index) => {
    const title = plainFeedText(row.title ?? "");
    if (!title) return [];
    const id = kind + ":" + (row.id?.trim() || index);
    if (seen.has(id)) return [];
    seen.add(id);
    const rawDescription = row.content ?? row.description ?? "";
    const tab = rawDescription.indexOf("\t");
    const location =
      row.location?.trim() ||
      (kind === "notice" && tab > 0 ? rawDescription.slice(0, tab).trim() : "");
    const description = plainFeedText(
      kind === "notice" && tab > 0
        ? rawDescription.slice(tab + 1)
        : rawDescription,
    );
    let registrationUrl: string | null = null;
    try {
      const link = new URL(row.registrationLink?.trim() ?? "");
      if (link.protocol === "https:") registrationUrl = link.toString();
    } catch {
      /* Unpublished registration links remain unavailable. */
    }
    const imageUrl = row.image?.trim() ?? "";
    const image = imageUrl.startsWith("https://res.cloudinary.com/") ? imageUrl : null;
    return [
      {
        id,
        kind,
        title,
        description,
        dateLabel: row.date?.trim() || "Dates to be announced",
        ...parseFeedDate(row.date ?? ""),
        time: row.time?.trim() ?? "",
        location,
        registrationUrl,
        image,
      },
    ];
  });
}

export function isPastEntry(item: TimelineEntry, today: string) {
  if (!item.dateKey) return false;
  return item.datePrecision === "month"
    ? item.dateKey.slice(0, 7) < today.slice(0, 7)
    : item.dateKey < today;
}

export function compareTimelineEntries(
  a: TimelineEntry,
  b: TimelineEntry,
  today: string,
  sort: "upcoming" | "newest",
) {
  if (sort === "newest")
    return (
      (b.dateKey ?? "").localeCompare(a.dateKey ?? "") ||
      a.title.localeCompare(b.title)
    );
  const rank = (entry: TimelineEntry) =>
    !entry.dateKey ? 1 : isPastEntry(entry, today) ? 2 : 0;
  const rankDifference = rank(a) - rank(b);
  if (rankDifference) return rankDifference;
  return rank(a) === 2
    ? (b.dateKey ?? "").localeCompare(a.dateKey ?? "")
    : (a.dateKey ?? "").localeCompare(b.dateKey ?? "");
}
