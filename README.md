# Unwritten

The website for [Unwritten](https://unwritten.care), an initiative that funds school-supply essentials so every student can take part.

Built with Next.js and deployed on Vercel. Pushing to `main` publishes the site.

```bash
pnpm install
pnpm dev
```

## Updating the kit count

Change `kitsDelivered` in `src/lib/site.ts`. The home page, descriptions and share card all read it.

## Writing a blog post

Add a Markdown file to `content/blog`. The file name becomes the address, so `first-delivery.md` lives at `/blog/first-delivery`.

```markdown
---
title: First delivery
description: One line shown under the title.
category: Research & Insights
date: 2026-11-06
---

The post starts here.
```

### Images

Put images in `public/blog/<post-name>/`. Add a cover at the top of the file; it appears in the blog list and on the post:

```markdown
cover: /blog/first-delivery/cover.jpg
coverAlt: Students opening their new school supplies
```

Place an image inside a post with Markdown:

```markdown
![What the image shows](/blog/first-delivery/classroom.jpg)
```

The `coverAlt` and bracket text describe the image for people who can't see it. Covers are cropped to fit, so keep the main subject near the middle.

Add `draft: true` to the top section to keep a post off the live site. Drafts still appear on the dev server, so you can check them first. `content/blog/bona-school-materials-2025.md` shows the formatting.

The blog page and its links appear once at least one post isn't a draft.
