"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { uploadImage } from "@/lib/cloudinary";
import { getDb } from "@/lib/mongodb";

// Server actions can be called directly via POST, so every one checks the session.
async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) throw new Error("Unauthorized");
}

const time = z.union([z.literal(""), z.string().regex(/^\d{2}:\d{2}$/)]).default("");
const entrySchema = z
  .object({
    kind: z.enum(["notice", "event"]),
    title: z.string().trim().min(1).max(200),
    dateMode: z.enum(["day", "month", "upcoming", "tba"]),
    day: z.iso.date().optional(),
    month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    startTime: time,
    endTime: time,
    location: z.string().trim().max(200),
    description: z.string().trim().max(5000),
  })
  .transform(({ dateMode, day, month, startTime, endTime, ...rest }) => ({
    ...rest,
    date: formatDate(dateMode, day, month),
    time: formatTime(startTime, endTime),
  }));

// Stored as readable labels ("July 17, 2026", "November 2026") that parseFeedDate understands.
function formatDate(mode: string, day?: string, month?: string) {
  const format = (value: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date(value));
  if (mode === "day" && day) return format(day, { month: "long", day: "numeric", year: "numeric" });
  if (mode === "month" && month) return format(`${month}-01`, { month: "long", year: "numeric" });
  if (mode === "upcoming") return "Upcoming";
  if (mode === "tba") return ""; // Shown as "Dates to be announced".
  throw new Error("Please pick a date.");
}

function formatTime(start: string, end: string) {
  const format = (value: string) => {
    const [h, m] = value.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  };
  if (!start) return "";
  return end ? `${format(start)} – ${format(end)}` : format(start);
}

// An empty file input still submits a 0-byte File, so treat that as "no new image".
async function readImage(formData: FormData) {
  const file = formData.get("image");
  return file instanceof File && file.size > 0 ? uploadImage(file) : undefined;
}

function readId(formData: FormData) {
  const id = String(formData.get("_id") ?? "");
  if (!ObjectId.isValid(id)) throw new Error("Invalid entry.");
  return new ObjectId(id);
}

export async function adminSignIn() {
  await signIn("google", { redirectTo: "/admin" });
}

export async function adminSignOut() {
  await signOut({ redirectTo: "/admin" });
}

export async function createEntry(formData: FormData) {
  await requireAdmin();
  const { kind, ...row } = entrySchema.parse(Object.fromEntries(formData));
  const image = await readImage(formData);
  const db = await getDb();
  await db.collection("timeline").insertOne({
    kind,
    order: Date.now(),
    row: { id: `${kind}-${crypto.randomUUID().slice(0, 8)}`, ...row, ...(image && { image }) },
  });
  revalidatePath("/admin");
}

export async function updateEntry(formData: FormData) {
  await requireAdmin();
  // Kind and row.id stay fixed so existing registrations keep pointing at the event.
  const { kind: _kind, ...row } = entrySchema.parse(Object.fromEntries(formData));
  const image = await readImage(formData);
  const removeImage = !image && formData.get("removeImage") === "on";
  const db = await getDb();
  await db.collection("timeline").updateOne(
    { _id: readId(formData) },
    {
      $set: Object.fromEntries(
        Object.entries({ ...row, ...(image && { image }) }).map(([key, value]) => ["row." + key, value]),
      ),
      // Old sheet notices kept location + text in "content"; drop it once edited.
      $unset: { "row.content": "", ...(removeImage && { "row.image": "" }) },
    },
  );
  revalidatePath("/admin");
}

export async function deleteEntry(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.collection("timeline").deleteOne({ _id: readId(formData) });
  revalidatePath("/admin");
}

const postSchema = z.object({
  title: z.string().trim().min(1).max(200),
  author: z.string().trim().max(100).default(""),
  excerpt: z.string().trim().max(300).default(""),
  body: z.string().trim().min(1).max(50000),
});

const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";

export async function createPost(formData: FormData) {
  await requireAdmin();
  const post = postSchema.parse(Object.fromEntries(formData));
  const db = await getDb();
  const blogs = db.collection("blogs");
  const base = slugify(post.title);
  // Keep URLs unique when two posts share a title.
  const taken = await blogs.countDocuments({ slug: base });
  const slug = taken ? `${base}-${crypto.randomUUID().slice(0, 6)}` : base;
  await blogs.insertOne({ ...post, slug, publishedAt: new Date() });
  revalidatePath("/admin");
  revalidatePath("/blog");
}

export async function updatePost(formData: FormData) {
  await requireAdmin();
  // Slug stays fixed so shared links keep working.
  const post = postSchema.parse(Object.fromEntries(formData));
  const db = await getDb();
  await db
    .collection("blogs")
    .updateOne({ _id: readId(formData) }, { $set: { ...post, updatedAt: new Date() } });
  revalidatePath("/admin");
  revalidatePath("/blog", "layout");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.collection("blogs").deleteOne({ _id: readId(formData) });
  revalidatePath("/admin");
  revalidatePath("/blog", "layout");
}

export async function deleteRegistration(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.collection("registrations").deleteOne({ _id: readId(formData) });
  revalidatePath("/admin");
}
