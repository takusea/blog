import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { transformerNotationDiff } from "@shikijs/transformers";
import { defineConfig, fontProviders } from "astro/config";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkLinkCard from "remark-link-card-plus";
import rehypeLocalImage from "~/lib/unifiedPlugins/rehypeLocalImage.js";
import remarkNote from "~/lib/unifiedPlugins/remarkNote.js";
import remarkXPostEmbed from "~/lib/unifiedPlugins/remarkXPostEmbed.js";
import remarkYouTubeEmbed from "~/lib/unifiedPlugins/remarkYouTubeEmbed.js";

export default defineConfig({
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	site: "https://blog.takusea.com/",
	trailingSlash: "always",
	output: "static",
	integrations: [solid(), sitemap()],
	server: {
		host: true,
		open: true,
	},
	fonts: [
		{
			name: "DotGothic16",
			cssVariable: "--font-dot-gothic-16",
			provider: fontProviders.google(),
			formats: ["ttf"],
		},
	],
	markdown: {
		syntaxHighlight: false,
		processor: unified({
			remarkPlugins: [
				remarkGfm,
				remarkDirective,
				remarkNote,
				remarkYouTubeEmbed,
				remarkXPostEmbed,
				[
					remarkLinkCard,
					{
						shortenUrl: true,
					},
				],
			],
			rehypePlugins: [
				rehypeHeadingIds,
				[rehypeExternalLinks, { target: "_blank" }],
				[
					rehypeAutolinkHeadings,
					{
						behavior: "prepend",
						content(node) {
							const headingNumber = Number.parseInt(node.tagName.charAt(1), 10);
							return h("span.header-link", new Array(headingNumber).fill("#"));
						},
					},
				],
				[
					rehypePrettyCode,
					{
						theme: {
							light: "one-light",
							dark: "one-dark-pro",
						},
						keepBackground: false,
						transformers: [transformerNotationDiff()],
					},
				],
				rehypeRaw,
				rehypeLocalImage,
			],
		}),
	},
});
