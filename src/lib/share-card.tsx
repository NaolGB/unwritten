import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { infinityPath } from "@/components/infinity-sign";
import { description, kitsDelivered, kitsLabel, tagline } from "@/lib/site";

const ACCENT = "#7a1c2e";
const INK = "#111111";

const regular = await readFile(
  join(process.cwd(), "src/assets/fonts/Geist-400.ttf"),
);
const medium = await readFile(
  join(process.cwd(), "src/assets/fonts/Geist-500.ttf"),
);

export const shareCardSize = { width: 1200, height: 630 };

export const shareCardAlt = description;

// The stroke runs past these bounds if it gets heavier, so icons widen the box.
export function InfinityMark({
  width,
  stroke = 70,
}: {
  width: number;
  stroke?: number;
}) {
  const pad = stroke / 2;
  const x = 108 - pad;
  const y = 55 - pad;
  const boxWidth = 533 + stroke;
  const boxHeight = 278 + stroke;

  return (
    <svg
      viewBox={`${x} ${y} ${boxWidth} ${boxHeight}`}
      width={width}
      height={(width * boxHeight) / boxWidth}
    >
      <path d={infinityPath} fill="none" stroke={ACCENT} strokeWidth={stroke} />
    </svg>
  );
}

export function shareCard() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background: "#ffffff",
        color: INK,
        fontFamily: "Geist",
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em" }}>
        Unwritten
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              fontSize: 280,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.07em",
            }}
          >
            {`${kitsDelivered} /`}
          </div>
          <InfinityMark width={300} />
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 25,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {kitsLabel}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 34,
            letterSpacing: "-0.02em",
          }}
        >
          {tagline}
        </div>
      </div>
    </div>,
    {
      ...shareCardSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
