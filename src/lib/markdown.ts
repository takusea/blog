import { transformerNotationDiff } from "@shikijs/transformers";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkLinkCard from "remark-link-card-plus";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import yaml from "yaml";
import { rehypeRelocateLocalImage } from "~/lib/unifiedPlugins/rehypeRelocateLocalImage";

const parseMarkdown = async (markdown: string) => {
	"use server";

	const processor = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkExtractFrontmatter, {
			yaml: yaml.parse,
			name: "frontmatter",
		})
		.use(remarkGfm)
		.use(remarkLinkCard, {
			cache: true,
			shortenUrl: true,
		})
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRelocateLocalImage)
		.use(rehypeSlug)
		.use(rehypeExtractToc)
		.use(rehypeExternalLinks, { target: "_blank" })
		.use(rehypePrettyCode, {
			theme: {
				light: "one-light",
				dark: "one-dark-pro",
			},
			keepBackground: false,
			transformers: [transformerNotationDiff()],
		} as Options)
		.use(rehypeRaw)
		.use(rehypeStringify, { allowDangerousHtml: true });

	return processor.process(markdown);
};

export { parseMarkdown };
