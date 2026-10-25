import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteUrl } from "@/lib/site";

// Default share card for every page that doesn't provide its own image.
export const alt = "Yogalife Kolkata | Yoga, Naturopathy & Ayurveda in Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colours from app/globals.css.
const cream = "#fcf4e8";
const sage = "#eaf0e9";
const forest = "#234d3c";
const muted = "#667369";

// kol-logo.png is 842x595 with wide white margins. These numbers crop it to
// the artwork (bridge, lotus and wordmark) inside a fixed frame.
const logoScale = 1.05;
const frame = { width: 520, height: 380 };
const logoOffset = { left: -181, top: -120 };

const offerings = ["Yoga", "Naturopathy", "Ayurveda", "Teacher Training"];

export default async function Image() {
  // Small logo on purpose: WhatsApp skips preview images larger than ~300KB.
  const logo = await readFile(join(process.cwd(), "public/kol-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const domain = siteUrl.includes("localhost") ? "" : siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: cream }}>
        {/* Logo panel: white so the logo's own white background blends in */}
        <div
          style={{
            width: 600,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <div
            style={{
              width: frame.width,
              height: frame.height,
              display: "flex",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt=""
              width={842 * logoScale}
              height={595 * logoScale}
              style={{ position: "absolute", left: logoOffset.left, top: logoOffset.top }}
            />
          </div>
        </div>

        {/* Text panel */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
            color: forest,
            borderLeft: `8px solid ${forest}`,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: muted }}>
            Yoga studio in Kolkata
          </div>
          <div style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Find your inner balance
          </div>
          <div style={{ marginTop: 20, fontSize: 28, lineHeight: 1.4, color: muted }}>
            Mindful movement, breathwork and traditional Indian wellness for every stage.
          </div>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap" }}>
            {offerings.map((item) => (
              <div
                key={item}
                style={{
                  marginRight: 12,
                  marginBottom: 12,
                  padding: "8px 20px",
                  fontSize: 22,
                  borderRadius: 999,
                  background: sage,
                  color: forest,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {domain && <div style={{ marginTop: 16, fontSize: 24, fontWeight: 700 }}>{domain}</div>}
        </div>
      </div>
    ),
    size,
  );
}
