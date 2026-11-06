import { cacheLife } from "next/cache";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { InfinitySign } from "@/components/infinity-sign";
import { Reveal, Words } from "@/components/reveal";
import { SongPlayer } from "@/components/song-player";
import { SupplyField } from "@/components/supply-field";
import { getPosts } from "@/lib/posts";
import {
  ctaHref,
  ctaText,
  kitsDelivered,
  kitsLabel,
  tagline,
} from "@/lib/site";

const leads = [
  { name: "Naol Basaye", href: "https://www.linkedin.com/in/naol-basaye/" },
  {
    name: "Abigiya E. Debela",
    href: "https://www.linkedin.com/in/abigiya-e-debela/",
  },
  {
    name: "Bezawit Mesfin",
    href: "https://www.linkedin.com/in/bezawit-mesfin-kassa/",
  },
];

const supporters = [
  "Abigiya E. Debela",
  "Amanuel Leake",
  "Anamo Abate",
  "Bamlak Cherinet",
  "Besufikad Beyene",
  "Bezawit M. Teshome",
  "Bezawit Mesfin",
  "Cherinet Zewde",
  "Eden Alemayehu",
  "Hiywot Yalew",
  "Kaleab Deneke",
  "Kaleb Fekadu",
  "Lensa Etana",
  "Lidiya Admassu",
  "Mintesinot Feleke",
  "Naol Mekuriya",
  "Nathanim Begashaw",
  "Ribka Legesse",
  "Sarem Tadelle",
  "Selam Yalew",
  "Shemsan Ali",
  "Shimale Shibiku",
  "Tesfab Legesse",
  "Tsinatu Tesfaye",
  "Yared Zerihun",
  "Yonathan Yosef",
  "Zikremedihn Ketema",
];

const gutter = "px-4 sm:px-8 lg:px-12";
const link =
  "-my-2 inline-block py-2 underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";
const label = "font-mono text-xs tracking-wider text-muted uppercase";
const prose = "max-w-2xl space-y-6 text-xl leading-relaxed sm:text-2xl";

function Heart() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="love"
      className="ml-1.5 inline-block size-[1em] fill-accent align-[-0.125em]"
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.3 8.3 2.2 4 6.4 4c2.4 0 4.3 1.3 5.6 3.4C13.3 5.3 15.2 4 17.6 4c4.2 0 6.1 4.3 4.4 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

// Whole years since June 2015; the count goes up each June 1 (UTC).
async function yearsRunning() {
  "use cache";
  cacheLife("days");

  const now = new Date();
  const years = now.getUTCFullYear() - 2015;
  return now.getUTCMonth() < 5 ? years - 1 : years;
}

export default async function Home() {
  const years = await yearsRunning();
  const hasPosts = getPosts().length > 0;

  return (
    <>
      <div className={`relative flex min-h-svh flex-col ${gutter}`}>
        <SupplyField />

        <header className="relative z-20 flex items-baseline justify-between gap-6 py-6 sm:py-8">
          <div className="flex items-baseline gap-6">
            <h1 className="text-lg font-semibold tracking-tight">Unwritten</h1>
            {hasPosts && (
              <Link
                href="/blog"
                className="-my-3 inline-block py-3 text-sm sm:text-base"
              >
                Blog
              </Link>
            )}
          </div>
          <p className="text-right text-sm sm:text-base">
            <span className="block sm:inline">
              est. 2015
              <span aria-hidden="true" className="hidden px-2 text-muted sm:inline">
                ·
              </span>
            </span>
            <span className="block sm:inline">
              Celebrating {years} Years of
              <Heart />
            </span>
          </p>
        </header>

        <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-center pb-10 text-center">
          <p className="pointer-events-auto text-[min(27vw,30svh)] leading-[0.9] font-medium tracking-[-0.07em] whitespace-nowrap md:text-[min(15vw,30svh)]">
            <span className="sr-only">
              {kitsDelivered} of infinity: {kitsLabel}
            </span>
            <span aria-hidden="true">
              {kitsDelivered} /{" "}
              <InfinitySign />
            </span>
          </p>
          <p
            aria-hidden="true"
            className="pointer-events-auto mt-4 font-mono text-xs tracking-wider text-balance uppercase sm:mt-6 sm:text-base"
          >
            {kitsLabel}
          </p>
          <p className="pointer-events-auto mt-3 max-w-[24ch] text-xl leading-tight tracking-tight text-balance sm:mt-6 sm:max-w-2xl sm:text-3xl">
            {/* The word joiner keeps the dash at the end of a line. */}
            {tagline.replace("—", "\u2060—")}
          </p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${ctaText}: message Naol on LinkedIn`}
            className="pointer-events-auto mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-medium whitespace-nowrap text-white transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:scale-95 sm:mt-7 sm:px-6 sm:py-3 sm:text-lg"
          >
            {ctaText}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <main id="content">
        <section className={`border-t border-line py-20 sm:py-32 ${gutter}`}>
          <h2 className={`${label} mb-8 sm:mb-12`}>Why “Unwritten”</h2>
          <Reveal>
            <p className="max-w-6xl text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.06] font-medium tracking-[-0.04em]">
              <Words text="Unwritten is an oxymoron—both empty and full of possibility. It points to futures not yet defined, ideas not yet formed, opportunities still waiting." />
            </p>
            <div className="mt-12 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-0">
              <p className="max-w-2xl text-xl leading-relaxed sm:text-2xl lg:col-start-2 lg:row-start-1">
                <Words text="By supplying the tools to take part, we help ensure that when students write their stories, they do so from a place of strength—not limitation." />
              </p>
              <div className="flex lg:col-start-1 lg:row-start-1 lg:pr-12">
                <SongPlayer />
              </div>
            </div>
          </Reveal>
        </section>

        <section
          className={`grid gap-14 border-t border-line py-20 sm:py-32 lg:grid-cols-2 lg:gap-0 ${gutter}`}
        >
          <div className="lg:col-start-2">
            <h2 className={`${label} mb-5`}>What we do</h2>
            <div className={prose}>
              <p>
                We’re an initiative that funds school-supply essentials—so every
                student can go to school. Through fundraising campaigns, donation
                drives, and partnerships, we gather resources, purchase materials,
                and deliver a full year’s worth of school essentials to students
                who need them most.
              </p>
              <p>
                We work internationally, with our support focused mainly on
                Ethiopia.
              </p>
              <p>
                We believe there’s incredible potential in every child. And from
                our own experience, education is one of the best ways to realize
                that.
              </p>
              <p>
                We’re aiming to reach everyone who needs our support (∞) and we’d
                love for you to join us. Say hi to one of our project leads! Below
                are those who’ve heard the call and said yes in the ways they can.
              </p>
            </div>
          </div>

          <div className="lg:col-start-1 lg:row-start-1">
            <h3 className={`${label} mb-5`}>Project Leads</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-xl sm:text-2xl lg:flex-col">
              {leads.map((lead) => (
                <li key={lead.href}>
                  <a
                    className={link}
                    href={lead.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {lead.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`border-t border-line py-20 sm:py-32 ${gutter}`}>
          <h2 className={`${label} mb-8 sm:mb-12`}>Those who said yes</h2>
          <Reveal>
            <ul className="gap-x-8 text-[clamp(2rem,3.9vw,3.75rem)] leading-[1.16] font-medium tracking-[-0.04em] md:columns-2">
              {supporters.map((name) => (
                <li key={name} className="break-inside-avoid">
                  <Words text={name} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
