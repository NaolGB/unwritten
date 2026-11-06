import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    { url: siteUrl },
    ...(posts.length > 0
      ? [
          { url: `${siteUrl}/blog`, lastModified: posts[0].date },
          ...posts.map((post) => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: post.date,
          })),
        ]
      : []),
  ];
}
