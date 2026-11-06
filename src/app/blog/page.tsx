import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog – Unwritten",
  description: "Writing from Unwritten",
  openGraph: {
    title: "Blog – Unwritten",
    description: "Writing from Unwritten",
    url: "/blog",
    siteName: "Unwritten",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  const posts = getPosts();

  // The blog doesn't exist until there is a post to read.
  if (posts.length === 0) notFound();

  return (
    <>
      <h1 className="text-[clamp(3.5rem,14vw,12rem)] leading-[0.95] font-medium tracking-[-0.065em]">
        Blog
      </h1>
      <ul className="mt-12 sm:mt-20">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-line last:border-b">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-4 py-5 sm:gap-8 sm:py-6"
            >
              <span className="relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-lg bg-line sm:w-44 sm:rounded-xl lg:w-56">
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 224px, (min-width: 640px) 176px, 112px"
                    className="object-cover"
                  />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[clamp(1.25rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.035em] transition-colors group-hover:text-accent">
                  {post.title}
                </span>
                <span className="mt-2 block font-mono text-xs tracking-wide text-muted">
                  {post.draft && "Draft · "}
                  {post.category && `${post.category} · `}
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="hidden text-2xl text-muted transition group-hover:translate-x-1 group-hover:text-accent sm:block"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
