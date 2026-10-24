// One-off import of notices and events into MongoDB.
// Reads the published Google Sheet (falls back to lib/event-snapshot.json per feed).
// Run from yogalife-kol/: node --env-file=.env.local scripts/seed-timeline.mjs
import { MongoClient } from "mongodb";
import { parseFeedCsv } from "../lib/event-feed.ts";
import snapshot from "../lib/event-snapshot.json" with { type: "json" };

const sheet =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJFOdlMKF_Vwx-F7UN1T7nGjbfkMw8FeL-97_gsuGcequQBBGpLecurFamRkIb7fYxjccQUvFCoECt/pub";
const feeds = [
  { kind: "notice", gid: "304718466", saved: snapshot.news },
  { kind: "event", gid: "153098187", saved: snapshot.events },
];

const client = new MongoClient(process.env.MONGODB_URI);
try {
  const collection = client
    .db(process.env.MONGODB_DB || "yogalife")
    .collection("timeline");
  for (const feed of feeds) {
    let rows;
    try {
      const response = await fetch(
        `${sheet}?gid=${feed.gid}&single=true&output=csv`,
        { signal: AbortSignal.timeout(10000) },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      rows = parseFeedCsv(await response.text());
      console.log(`${feed.kind}: ${rows.length} rows from Google Sheet`);
    } catch (error) {
      rows = feed.saved;
      console.log(`${feed.kind}: sheet unavailable (${error.message}), using snapshot (${rows.length} rows)`);
    }
    // Replace this kind's rows so re-running the script stays in sync.
    await collection.deleteMany({ kind: feed.kind });
    if (rows.length) {
      await collection.insertMany(
        rows.map((row, order) => ({ kind: feed.kind, order, row })),
      );
    }
  }
  await collection.createIndex({ kind: 1, order: 1 });
  console.log("Done.");
} finally {
  await client.close();
}
