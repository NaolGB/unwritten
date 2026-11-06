import { ImageResponse } from "next/og";
import { InfinityMark } from "@/lib/share-card";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        borderRadius: 14,
      }}
    >
      <InfinityMark width={56} stroke={92} />
    </div>,
    size,
  );
}
