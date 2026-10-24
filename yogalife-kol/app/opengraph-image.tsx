import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Default share card for every page that doesn't provide its own image.
export const alt = "Yogalife Kolkata | Yoga, Naturopathy & Ayurveda in Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo-lotus.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcf4e8",
          color: "#234d3c",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={180} height={180} style={{ objectFit: "contain" }} />
        <div style={{ marginTop: 36, fontSize: 80, fontWeight: 700 }}>Yogalife Kolkata</div>
        <div style={{ marginTop: 16, fontSize: 36, color: "#667369" }}>
          Yoga, Naturopathy &amp; Ayurveda in Kolkata
        </div>
      </div>
    ),
    size,
  );
}
