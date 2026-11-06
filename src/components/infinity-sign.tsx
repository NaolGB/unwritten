export const infinityPath =
  "M352 194C400 110 450 55 515 55C590 55 641 115 641 194C641 273 590 333 515 333C450 333 400 278 352 194C311 123 275 88 226 88C160 88 108 135 108 194C108 253 160 300 226 300C275 300 311 265 352 194";

// One continuous line traced over the proportions of Geist's ∞, so it can be
// drawn like a pen stroke. Sized in em to take the character's place in the text.
export function InfinitySign() {
  return (
    <svg
      viewBox="0 0 747 390"
      aria-hidden="true"
      className="inline-block text-accent h-[0.39em] w-[0.747em] overflow-visible align-[0.17em]"
    >
      <path
        className="infinity-stroke"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={70}
        d={infinityPath}
      />
    </svg>
  );
}
