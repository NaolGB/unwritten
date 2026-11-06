import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { ctaHref, ctaText } from "@/lib/site";

const linkStyle =
  "-my-2.5 inline-block py-2.5 underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

export function Footer() {
  const hasPosts = getPosts().length > 0;

  return (
    <>
      <section className="border-t border-line px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
        <a
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          className="group block max-w-6xl"
        >
          <h2 className="text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.06] font-medium tracking-[-0.04em] text-balance transition-colors group-hover:text-accent">
            {ctaText}
            <span
              aria-hidden="true"
              className="ml-[0.2em] inline-block text-accent transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
            >
              ↗
            </span>
          </h2>
          <p className="mt-6 font-mono text-xs tracking-wider text-muted uppercase sm:mt-8">
            Message Naol on LinkedIn
          </p>
        </a>
      </section>

      <footer className="flex items-baseline justify-between gap-6 border-t border-line px-4 py-8 sm:px-8 lg:px-12">
        <p className="font-semibold tracking-tight">Unwritten</p>
        <div className="flex gap-6">
          {hasPosts && (
            <Link className={linkStyle} href="/blog">
              Blog
            </Link>
          )}
          <a
            className={linkStyle}
            href="https://www.linkedin.com/company/unwrittencare"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
}
