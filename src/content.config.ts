import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    author: z.string().default('GrowthEngine Team'),
    tags: z.array(z.string()).default([]),
    // Optional images, paths under public/ (e.g. /blog/my-post/cover.jpg)
    cover: z.string().optional(),
    hero_image: z.string().optional(),
    // Set `featured: true` on ONE post to put it in the homepage hero.
    featured: z.boolean().default(false),
    // Optional hero text when this post is featured (defaults: title / excerpt)
    hero_headline: z.string().optional(),
    hero_subtext: z.string().optional(),
    // Drafts are left out of the site
    draft: z.boolean().default(false),
  }),
});

const item = z.object({ title: z.string(), description: z.string() });
const service = item.extend({ points: z.array(z.string()).default([]) });

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    hero_eyebrow: z.string().optional(),
    trusted_by_label: z.string().optional(),
    trusted_by: z.array(z.object({ name: z.string(), logo: z.string().optional() })).default([]),
    services_heading: z.string(),
    services: z.array(service),
    steps_heading: z.string().optional(),
    steps: z.array(item).default([]),
    why_heading: z.string(),
    why: z.array(item),
    case_studies_heading: z.string().optional(),
    testimonial: z.object({ quote: z.string(), attribution: z.string() }).optional(),
    cta_heading: z.string(),
    cta_text: z.string(),
    cta_button_label: z.string().default('Talk to our CEO'),
  }),
});

export const collections = { blog, pages };
