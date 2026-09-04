import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import thumbnailLoader from "~/lib/loaders/thumbnail";

const posts = defineCollection({
	loader: thumbnailLoader(),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z
				.union([z.string(), z.null()])
				.optional()
				.transform((value) => value ?? ""),
			date: z
				.union([z.string(), z.date()])
				.transform((value) =>
					value instanceof Date ? value.toISOString().slice(0, 10) : value,
				),
			tags: z
				.array(z.union([z.string(), z.number()]))
				.default([])
				.transform((values) => values.map((value) => String(value))),
			thumbnail: image().optional(),
		}),
});

export const collections = { posts };
