import { connection } from "next/server";
import { loadTimeline } from "@/lib/timeline";

export async function GET() {
  await connection();
  const data = await loadTimeline();
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
