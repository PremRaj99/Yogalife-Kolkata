import { z } from "zod";

export const timelineEntrySchema = z.object({
  id: z.string(),
  kind: z.enum(["notice", "event"]),
  title: z.string().min(1),
  description: z.string(),
  dateLabel: z.string(),
  dateKey: z.iso.date().nullable(),
  datePrecision: z.enum(["day", "month", "unknown"]),
  time: z.string(),
  location: z.string(),
  registrationUrl: z.url().startsWith("https://").nullable(),
});

export const timelineFeedSchema = z.object({
  items: z.array(timelineEntrySchema),
  today: z.iso.date(),
  staleFeeds: z.array(z.enum(["notices", "events"])),
  savedAt: z.string(),
});

export const timelineFiltersSchema = z.object({
  search: z
    .string()
    .trim()
    .max(100, "Please keep your search under 100 characters."),
  kind: z.enum(["all", "notice", "event"]),
  sort: z.enum(["upcoming", "newest"]),
  page: z.number().int().min(1),
});

export type TimelineEntry = z.infer<typeof timelineEntrySchema>;
