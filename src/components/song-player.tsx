"use client";

import { useState } from "react";

const VIDEO_ID = "b7k0a5hYnSI";

// YouTube only loads once someone asks for it, so the page stays fast and nothing
// plays by surprise.
export function SongPlayer() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full max-w-xl overflow-hidden rounded-2xl bg-foreground">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="Natasha Bedingfield, Unwritten (official video)"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="inline-flex min-h-11 cursor-pointer items-center gap-3 self-start rounded-full bg-accent py-3 pr-6 pl-5 text-lg font-medium text-white transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:scale-95"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
      </svg>
      Yes, like the song
    </button>
  );
}
