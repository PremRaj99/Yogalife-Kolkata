import { samplePrograms } from "@/lib/programs";
export async function GET() {
  return Response.json(samplePrograms);
}
