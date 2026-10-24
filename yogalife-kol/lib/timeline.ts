import snapshot from "@/lib/event-snapshot.json";
import { normalizeFeedRows, type FeedRow } from "@/lib/event-feed";
import {
  timelineFeedSchema,
  timelineEntrySchema,
  type TimelineEntry,
} from "@/lib/event-schemas";
import { getDb } from "@/lib/mongodb";

// Each document stores one notice/event row in the same shape as the old sheet columns.
type TimelineDoc = { kind: TimelineEntry["kind"]; order: number; row: FeedRow };

// Loads notices and events from MongoDB, falling back to the saved snapshot if the DB is unreachable.
export async function loadTimeline() {
  let notices: FeedRow[];
  let events: FeedRow[];
  const staleFeeds: ("notices" | "events")[] = [];
  try {
    const db = await getDb();
    const docs = await db
      .collection<TimelineDoc>("timeline")
      .find({}, { projection: { _id: 0 } })
      .sort({ kind: 1, order: 1 })
      .toArray();
    notices = docs.filter((doc) => doc.kind === "notice").map((doc) => doc.row);
    events = docs.filter((doc) => doc.kind === "event").map((doc) => doc.row);
  } catch (error) {
    console.error("Timeline DB unavailable, using snapshot:", error);
    notices = snapshot.news as FeedRow[];
    events = snapshot.events as FeedRow[];
    staleFeeds.push("notices", "events");
  }
  const items = [
    ...normalizeFeedRows(notices, "notice"),
    ...normalizeFeedRows(events, "event"),
  ].flatMap((item) => {
    const parsed = timelineEntrySchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return timelineFeedSchema.parse({
    items,
    today,
    staleFeeds,
    savedAt: snapshot.savedAt,
  });
}
