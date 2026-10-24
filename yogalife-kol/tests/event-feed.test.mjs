import test from "node:test";
import assert from "node:assert/strict";
import {
  parseFeedCsv,
  parseFeedDate,
  normalizeFeedRows,
  plainFeedText,
  isPastEntry,
  compareTimelineEntries,
} from "../lib/event-feed.ts";

test("CSV keeps quoted commas and multiline event descriptions together", () => {
  const rows = parseFeedCsv(
    'id,title,date,description\ne-1,"Yoga, together","July 17, 2026","First line\nSecond line"\n',
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].title, "Yoga, together");
  assert.equal(rows[0].description, "First line\nSecond line");
  assert.throws(() => parseFeedCsv("id,name\n1,Wrong header"));
  assert.throws(() => parseFeedCsv('id,title\n1,"Unclosed quote'));
});

test("date parsing preserves month-only and unpublished date precision", () => {
  assert.deepEqual(parseFeedDate("November 2026"), {
    dateKey: "2026-11-01",
    datePrecision: "month",
  });
  assert.deepEqual(parseFeedDate("July 17, 2026"), {
    dateKey: "2026-07-17",
    datePrecision: "day",
  });
  assert.deepEqual(parseFeedDate("Upcoming"), {
    dateKey: null,
    datePrecision: "unknown",
  });
  assert.equal(parseFeedDate("February 30, 2026").dateKey, null);
  assert.equal(parseFeedDate("2026-13-01").dateKey, null);
});

test("normalization handles blank and duplicate rows and rejects unsafe registration URLs", () => {
  const rows = [
    {
      id: "1",
      title: "Retreat",
      date: "November 2026",
      content: "Varanasi\tA mindful gathering",
      registrationLink: "javascript:alert(1)",
    },
    { id: "1", title: "Duplicate" },
    { title: " " },
  ];
  const items = normalizeFeedRows(rows, "notice");
  assert.equal(items.length, 1);
  assert.equal(items[0].location, "Varanasi");
  assert.equal(items[0].description, "A mindful gathering");
  assert.equal(items[0].registrationUrl, null);
  assert.equal(isPastEntry(items[0], "2026-11-28"), false);
  assert.equal(isPastEntry(items[0], "2026-12-01"), true);
});

test("feed HTML becomes plain text without executable content", () => {
  const text = plainFeedText(
    "<p>Yoga &amp; wellbeing</p><script>alert(1)</script><p>Begin <strong>here</strong>.</p>",
  );
  assert.match(text, /Yoga & wellbeing/);
  assert.match(text, /Begin here/);
  assert.doesNotMatch(text, /alert|<|>/);
  const formatted = plainFeedText(
    "<p>Internationally\r\n recognized yoga.</p>\r\n\r\n<p>Begin here.</p>",
  );
  assert.match(formatted, /Internationally recognized yoga\./);
  assert.doesNotMatch(formatted, /\n{3}/);
});

test("upcoming dates precede unpublished dates and the archive is newest first", () => {
  const items = normalizeFeedRows(
    [
      { title: "June event", date: "June 21, 2026" },
      { title: "TTC", date: "Upcoming" },
      { title: "Retreat", date: "November 2026" },
      { title: "July event", date: "July 17, 2026" },
    ],
    "event",
  );
  assert.deepEqual(
    items
      .sort((a, b) => compareTimelineEntries(a, b, "2026-10-24", "upcoming"))
      .map((item) => item.title),
    ["Retreat", "TTC", "July event", "June event"],
  );
});
