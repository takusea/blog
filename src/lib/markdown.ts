import { unified } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkLinkCard from "remark-link-card-plus";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import yaml from "yaml";

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
		.use(rehypeRaw)
		.use(rehypeSlug)
		.use(rehypeExtractToc)
		.use(rehypeExternalLinks, { target: "_blank" })
		.use(rehypePrettyCode)
		.use(rehypeStringify, { allowDangerousHtml: true });

	return processor.process(markdown);
};

export { parseMarkdown };
