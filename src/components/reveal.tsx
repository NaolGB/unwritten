"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";

const FAINT = 0.24;
const SOFT_EDGE = 3; // words

export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <span data-word>{word}</span>
        </Fragment>
      ))}
    </>
  );
}

// Darkens the Words inside it one by one as the block scrolls through the
// viewport. The server renders them solid, so the text stays readable without
// JavaScript, and it's left solid for people who prefer reduced motion.
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = Array.from(
      element.querySelectorAll<HTMLElement>("[data-word]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, bottom, height } = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollLeft =
        document.documentElement.scrollHeight - viewport - window.scrollY;

      // 0 when the top is 95% down the screen, 1 when the bottom is 75% down,
      // or as high as it can get, so the last block still finishes.
      const start = viewport * 0.95;
      const end = Math.max(viewport * 0.75, bottom - scrollLeft);
      const progress = (start - top) / (start - end + height);

      // Words in list columns count separately, so the columns write together.
      const columns = new Map<number, HTMLElement[]>();
      for (const word of words) {
        const left = word.closest("li")?.getBoundingClientRect().left ?? 0;
        columns.set(left, [...(columns.get(left) ?? []), word]);
      }

      for (const column of columns.values()) {
        const written = progress * (column.length + SOFT_EDGE);

        column.forEach((word, index) => {
          const amount = Math.min(
            Math.max((written - index) / SOFT_EDGE, 0),
            1,
          );
          word.style.opacity = String(FAINT + (1 - FAINT) * amount);
        });
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
