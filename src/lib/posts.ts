import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  keywords?: string[];
  date: string;
  draft: boolean;
  cover?: string;
  coverAlt: string;
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content/blog");

function readPost(fileName: string): Post {
  const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const { data, content } = matter(source);

  if (!data.title || !(data.date instanceof Date)) {
    throw new Error(
      `${fileName} needs a title and a date like 2026-11-06 at the top of the file`,
    );
  }

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: String(data.title),
    description: data.description ? String(data.description) : undefined,
    category: data.category ? String(data.category) : undefined,
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : undefined,
    date: data.date.toISOString().slice(0, 10),
    draft: data.draft === true,
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : "",
    html: marked
      .parse(content, { async: false })
      .replaceAll("<img ", '<img loading="lazy" decoding="async" ')
      // Links out of the site open in a new tab.
      .replaceAll('<a href="http', '<a target="_blank" rel="noreferrer" href="http'),
  };
}

// Newest first. Drafts only appear when running the dev server.
export function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPost)
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}
