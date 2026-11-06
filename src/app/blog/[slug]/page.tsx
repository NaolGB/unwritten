import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/posts";

// Posts are prerendered, so there is no loading state to stream in first.
export const instant = false;

// Cache Components fails the build on an empty list, so a placeholder stands in
// until the first post is published. It has no post, so it renders the 404.
export function generateStaticParams() {
  const posts = getPosts();
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} – Unwritten`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
      siteName: "Unwritten",
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <h1 className="max-w-5xl text-[clamp(2.25rem,6vw,5rem)] leading-[1.02] font-medium tracking-[-0.055em]">
        {post.title}
      </h1>
      {post.description && (
        <p className="mt-5 max-w-3xl text-xl leading-snug tracking-tight text-muted sm:mt-6 sm:text-2xl">
          {post.description}
        </p>
      )}
      {post.cover ? (
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-xl bg-line sm:mt-12 sm:aspect-auto sm:h-[52svh] sm:min-h-80 sm:rounded-2xl">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            preload
            sizes="(min-width: 1024px) calc(100vw - 6rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mt-8 border-t border-line sm:mt-12" />
      )}
      <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-0">
        <p className="font-mono text-xs tracking-wide text-muted">
          {post.draft && "Draft · "}
          {post.category && `${post.category} · `}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <div
          className="post max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
