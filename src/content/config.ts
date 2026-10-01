import { defineCollection, z } from 'astro:content';

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  thumbnail: z.string().optional(),
  video: z.string().optional(),
  templateKey: z.string().optional(),
  // Add other fields as discovered
  image: z.string().optional(),
  featuredimage: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  number: z.number().optional(),     // order on the Art page (1 = first)
  hidden: z.boolean().optional(),    // keep the page, leave it out of the gallery
  teaser: z.string().optional(),     // short video used on the gallery card
  poster: z.string().optional(),     // still image shown before the gallery video plays
  videos: z.array(z.string()).optional(), // extra videos shown in the row after `video`
  pagetype: z.array(z.string()).optional(),
}).partial();

const news = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const work = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const pages = defineCollection({
  type: 'content',
  schema: commonSchema,
});

export const collections = {
  news,
  work,
  pages,
};
