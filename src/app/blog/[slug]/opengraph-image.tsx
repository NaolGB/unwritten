import { join } from "node:path";
import { cacheLife } from "next/cache";
import sharp from "sharp";
import { getPost, getPosts } from "@/lib/posts";
import { shareCard, shareCardSize } from "@/lib/share-card";

export const alt = "A photo from an Unwritten blog post";
export const size = shareCardSize;
export const contentType = "image/jpeg";

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "__none__" }];
}

// Link previews match the site: the post's cover in grayscale, or the main share
// card for a post without one. Cached so each one is made once, at build time.
async function previewImage(slug: string) {
  "use cache";
  cacheLife("max");

  const post = getPost(slug);

  const image = post?.cover
    ? sharp(join(process.cwd(), "public", post.cover))
        .resize(size.width, size.height)
        .grayscale()
    : sharp(Buffer.from(await shareCard().arrayBuffer()));

  const bytes = await image.jpeg({ quality: 82 }).toBuffer();
  return new Uint8Array(bytes);
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return new Response(await previewImage(slug), {
    headers: { "Content-Type": contentType },
  });
}
