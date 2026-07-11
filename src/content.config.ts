import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workImage = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const workBlock = z.object({
  section: z.string().optional(),
  text: z.string().optional(),
  highlight: z.string().optional(),
  images: z.array(workImage).default([]),
});

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    category: z.string(),
    title: z.string(),
    thesis: z.string(),
    role: z.string(),
    dates: z.string(),
    scope: z.string().optional(),
    status: z.enum(['complete', 'coming-soon']).default('complete'),
    kind: z.enum(['work', 'other']).default('work'),
    initials: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageNarrow: z.boolean().default(false),
    work: z.array(workBlock).default([]),
    result: z.string(),
    lesson: z.string(),
    nextSlug: z.string().optional(),
  }),
});

export const collections = { projects };
