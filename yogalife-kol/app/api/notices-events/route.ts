import snapshot from "@/lib/event-snapshot.json";
import { connection } from "next/server";
import {
  normalizeFeedRows,
  parseFeedCsv,
  type FeedRow,
} from "@/lib/event-feed";
import { timelineFeedSchema, timelineEntrySchema } from "@/lib/event-schemas";

const sheet =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJFOdlMKF_Vwx-F7UN1T7nGjbfkMw8FeL-97_gsuGcequQBBGpLecurFamRkIb7fYxjccQUvFCoECt/pub";
const feeds = [
  { name: "notices", kind: "notice", gid: "304718466", saved: snapshot.news },
  { name: "events", kind: "event", gid: "153098187", saved: snapshot.events },
] as const;

export async function GET() {
  await connection();
  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      const response = await fetch(
        sheet + "?gid=" + feed.gid + "&single=true&output=csv",
        { cache: "no-store", signal: AbortSignal.timeout(6000) },
      );
      if (!response.ok) throw new Error("Published feed unavailable.");
      return parseFeedCsv(await response.text());
    }),
  );
  const staleFeeds: ("notices" | "events")[] = [];
  const items = results.flatMap((result, index) => {
    const feed = feeds[index];
    if (result.status === "rejected") staleFeeds.push(feed.name);
    const rows =
      result.status === "fulfilled" ? result.value : (feed.saved as FeedRow[]);
    return normalizeFeedRows(rows, feed.kind).flatMap((item) => {
      const parsed = timelineEntrySchema.safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  });
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const data = timelineFeedSchema.parse({
    items,
    today,
    staleFeeds,
    savedAt: snapshot.savedAt,
  });
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
