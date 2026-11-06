"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import backpack from "@/assets/supplies/backpack.webp";
import bookGreen from "@/assets/supplies/book-green.webp";
import bookRed from "@/assets/supplies/book-red.webp";
import eraser from "@/assets/supplies/eraser.webp";
import notebook from "@/assets/supplies/notebook.webp";
import pen from "@/assets/supplies/pen.webp";
import pencil from "@/assets/supplies/pencil.webp";
import protractor from "@/assets/supplies/protractor.webp";
import sharpener from "@/assets/supplies/sharpener.webp";

type Depth = "near" | "mid" | "far";

type Supply = {
  image: StaticImageData;
  action: string;
  depth: Depth;
  tilt: number;
  // Centre of the item as a % of the hero, and its width as a % of the page.
  desktop: [x: number, y: number, size: number];
  // Items without a phone position only appear on larger screens.
  phone?: [x: number, y: number, size: number];
};

const supplies: Supply[] = [
  { image: pencil, action: "scribble", depth: "near", tilt: -6, desktop: [10, 31, 11.5], phone: [15, 19, 23] },
  { image: backpack, action: "sway", depth: "near", tilt: 5, desktop: [88, 29, 12], phone: [82, 20, 24] },
  { image: bookRed, action: "hop", depth: "near", tilt: -7, desktop: [13, 76, 11], phone: [52, 93, 22] },
  { image: notebook, action: "flip", depth: "near", tilt: 6, desktop: [87, 75, 11], phone: [85, 79, 22] },
  { image: protractor, action: "rock", depth: "mid", tilt: -8, desktop: [27, 17, 8.5], phone: [50, 80, 23] },
  { image: pen, action: "click", depth: "mid", tilt: 4, desktop: [72, 15, 8], phone: [18, 93, 22] },
  { image: eraser, action: "rub", depth: "mid", tilt: 10, desktop: [7, 54, 7], phone: [14, 79, 21] },
  { image: sharpener, action: "spin", depth: "mid", tilt: -9, desktop: [93, 52, 6.5], phone: [85, 93, 20] },
  { image: bookGreen, action: "hop", depth: "mid", tilt: 8, desktop: [30, 88, 7.5], phone: [47, 16, 19] },
  { image: pencil, action: "scribble", depth: "mid", tilt: 40, desktop: [70, 88, 7] },
  { image: eraser, action: "rub", depth: "far", tilt: -12, desktop: [43, 12, 3.5] },
  { image: sharpener, action: "spin", depth: "far", tilt: 14, desktop: [57, 9, 3.2] },
  { image: notebook, action: "flip", depth: "far", tilt: -14, desktop: [19, 50, 3.6] },
  { image: bookGreen, action: "hop", depth: "far", tilt: 12, desktop: [81, 47, 3.6] },
  { image: protractor, action: "rock", depth: "far", tilt: 10, desktop: [50, 93, 4] },
  { image: pen, action: "click", depth: "far", tilt: -20, desktop: [21, 14, 3.4] },
  { image: bookRed, action: "hop", depth: "far", tilt: 14, desktop: [96, 90, 3.8] },
  { image: backpack, action: "sway", depth: "far", tilt: -10, desktop: [3, 93, 3.8] },
];

const parallax: Record<Depth, number> = { near: 26, mid: 14, far: 6 };

export function SupplyField() {
  const field = useRef<HTMLDivElement>(null);

  // Items shift with the cursor, the nearest ones most, so the field has depth.
  useEffect(() => {
    const element = field.current;
    if (!element) return;
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        element.style.setProperty("--px", String(-x * 2));
        element.style.setProperty("--py", String(-y * 2));
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={field}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      {supplies.map(({ image, action, depth, tilt, desktop, phone }, index) => (
        <div
          key={index}
          className={`supply supply-${depth} ${phone ? "" : "hidden md:block"}`}
          style={
            {
              "--i": index,
              "--tilt": `${tilt}deg`,
              "--d": parallax[depth],
              "--x-md": `${desktop[0]}%`,
              "--y-md": `${desktop[1]}%`,
              "--s-md": `${desktop[2]}vw`,
              "--dx-md": 50 - desktop[0],
              "--dy-md": 50 - desktop[1],
              "--x": `${(phone ?? desktop)[0]}%`,
              "--y": `${(phone ?? desktop)[1]}%`,
              "--s": `${(phone ?? desktop)[2]}vw`,
              "--dx": 50 - (phone ?? desktop)[0],
              "--dy": 50 - (phone ?? desktop)[1],
            } as CSSProperties
          }
        >
          <div className="supply-float">
            <Image
              src={image}
              alt=""
              draggable={false}
              loading="eager"
              sizes="(min-width: 768px) 13vw, 28vw"
              className={`supply-${action} h-auto w-full`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
