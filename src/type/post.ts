import type { ImageMetadata } from "astro";

export type PostMetadata = {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	thumbnail?: ImageMetadata;
};

export type PostToc = {
	id: string;
	value: string;
	children: PostToc[];
};
