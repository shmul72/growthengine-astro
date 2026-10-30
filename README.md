# GrowthEngine website

Plain static site built with [Astro](https://astro.build). No server, no CMS, no database.
Blog posts are Markdown files. Search is [Pagefind](https://pagefind.app), built at deploy time.

## Run it locally

Needs Node 22.23.4 or newer (Node 24 recommended).

```
npm install
npm run dev        # http://localhost:4321 (uses the built-in search; Pagefind needs a build)
npm run build      # builds the site into dist/ and the search index into dist/pagefind/
npm run preview    # serves dist/ locally
```

## Add a blog post

1. Create a new file in `src/content/blog/`, e.g. `src/content/blog/my-new-post.md`.
   The file name becomes the address: `/blog/my-new-post`.
2. Start it with this header, then write the post in Markdown below it:

```
---
title: "My new post"
excerpt: "One or two sentences shown on the blog cards and in search results."
date: 2026-11-01
author: GrowthEngine Team
tags: [Hiring]
---

Post text goes here. Use ## for section headings.
```

3. Optional images: put them in `public/blog/my-new-post/` and add
   `cover: /blog/my-new-post/cover.jpg` (card image) or `hero_image: ...` (wide image on the post).
4. Optional: `draft: true` keeps a post off the site until you remove it.
5. Commit and push. Cloudflare Pages rebuilds the site automatically.

Posts tagged `Case Studies` also show in the Case Studies section on the homepage (newest 3).

## Pick the featured post (homepage hero)

The big homepage headline and its **Read More** button follow the featured post.

- Add `featured: true` to the header of the post you want, and remove it from the old one.
- The headline is the post title. To use a different line, add `hero_headline: "..."`.
- The text under the headline is the post's excerpt. To use a different line, add `hero_subtext: "..."`.
- If no post is featured, the newest post is used. If several are, the newest of them wins.

## Edit the homepage text

All homepage copy (sections, cards, closing call to action) is in `src/content/pages/home.md`.
The "Trusted by" logo bar and the testimonial stay hidden until real ones are added there.

## Search

The blog search uses Pagefind, built by `npm run build`. If the Pagefind files can't load
(for example in `npm run dev`), the page falls back to a simple built-in search over the posts.

## Booking link

Every "Get in Touch" / "Talk to our CEO" button uses `CALENDLY_URL` in `src/config.ts`.

## Deploy on Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version comes from `.node-version` (24).

`public/_redirects` sends the old Wix post addresses (`/post/...`) to the new ones,
so existing links and search results keep working after the switch.

## Project layout

```
src/config.ts               site settings (booking link, site description)
src/content/blog/           blog posts (Markdown)
src/content/pages/home.md   homepage copy
src/pages/                  pages: home, blog list, blog post, 404, sitemap
src/components/             nav, footer, post card
src/layouts/Base.astro      shared page shell
src/styles/global.css       colors, fonts, buttons
public/                     logo, robots.txt, redirects, images
```
