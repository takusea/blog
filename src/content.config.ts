import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: z.object({
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
		thumbnail: z.string().optional(),
	}),
});

export const collections = { posts };
