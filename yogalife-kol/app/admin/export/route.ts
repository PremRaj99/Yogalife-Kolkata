import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { getDb } from "@/lib/mongodb";
import { matchesRegistration, type RegistrationFields } from "../registration-filter";

type RegistrationDoc = RegistrationFields & { createdAt: Date };

// Quote every cell, and neutralise values a spreadsheet would run as a formula.
function cell(value: string, allowLeadingSign = false) {
  const risky = allowLeadingSign ? /^[=@\t\r]/ : /^[=+\-@\t\r]/;
  const safe = risky.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const query = (request.nextUrl.searchParams.get("q") ?? "").slice(0, 100);
  const db = await getDb();
  const registrations = await db
    .collection<RegistrationDoc>("registrations")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  const header = ["Name", "Email", "Phone", "Event", "Registered (IST)"];
  const lines = registrations
    .filter((item) => matchesRegistration(item, query))
    .map((item) =>
      [
        cell(item.name),
        cell(item.email),
        // Phones are validated as digits, spaces, dashes and an optional leading +.
        cell(item.phone, true),
        cell(item.eventTitle),
        cell(item.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })),
      ].join(","),
    );

  // BOM so Excel opens the file as UTF-8.
  const csv = "\uFEFF" + [header.map((h) => cell(h)).join(","), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
