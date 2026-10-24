import { isPastEntry } from "@/lib/event-feed";
import { sendMail } from "@/lib/mailer";
import { getDb } from "@/lib/mongodb";
import { registrationSchema } from "@/lib/registration-schema";
import { loadTimeline } from "@/lib/timeline";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid details." },
      { status: 400 },
    );
  }
  const { website, ...input } = parsed.data;
  // Bots fill the hidden field; pretend success without saving.
  if (website) return Response.json({ ok: true });

  // Only accept registrations for real, upcoming events from the feed.
  const { items, today } = await loadTimeline();
  const event = items.find(
    (item) => item.id === input.eventId && item.kind === "event",
  );
  if (!event || isPastEntry(event, today)) {
    return Response.json(
      { error: "Registration for this event is closed." },
      { status: 404 },
    );
  }

  const email = input.email.toLowerCase();
  const db = await getDb();
  const registrations = db.collection("registrations");
  // Unique index keeps one registration per email per event.
  await registrations.createIndex({ eventId: 1, email: 1 }, { unique: true });
  try {
    await registrations.insertOne({
      ...input,
      email,
      eventTitle: event.title,
      eventDate: event.dateLabel,
      createdAt: new Date(),
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return Response.json(
        { error: "You are already registered for this event." },
        { status: 409 },
      );
    }
    throw error;
  }

  const details = [
    `Event: ${event.title}`,
    `Date: ${event.dateLabel}`,
    event.time && `Time: ${event.time}`,
    event.location && `Location: ${event.location}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Registration is saved; email failures are logged but don't fail the request.
  await Promise.allSettled([
    sendMail(
      email,
      `Registration confirmed: ${event.title}`,
      `Hi ${input.name},\n\nThank you for registering. We look forward to seeing you.\n\n${details}\n\nWarm regards,\nYogalife Kolkata`,
    ),
    process.env.ADMIN_EMAIL &&
      sendMail(
        process.env.ADMIN_EMAIL,
        `New registration: ${event.title}`,
        `${details}\n\nName: ${input.name}\nEmail: ${email}\nPhone: ${input.phone}\nMessage: ${input.message || "-"}`,
      ),
  ]).then((results) =>
    results.forEach((result) => {
      if (result.status === "rejected")
        console.error("Registration email failed:", result.reason);
    }),
  );

  return Response.json({ ok: true }, { status: 201 });
}
