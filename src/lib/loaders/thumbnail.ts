import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Loader } from "astro/loaders";
import { parse } from "yaml";

const imagePattern = /!\[[^\]]*\]\(<?([^\s)>]+)>?(?:\s+[^)]*)?\)/;
const htmlImagePattern = /<img\b[^>]*\bsrc=["']([^"']+)["']/i;

const getFirstImage = (body: string) => {
	const markdownImage = body.match(imagePattern)?.[1];
	const htmlImage = body.match(htmlImagePattern)?.[1];
	const image = markdownImage ?? htmlImage;

	if (
		!image ||
		image.startsWith("http") ||
		image.startsWith("data:") ||
		image.includes("link-card")
	) {
		return undefined;
	}

	return image;
};

const getMarkdownFiles = async (directory: string): Promise<string[]> => {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const path = join(directory, entry.name);
			return entry.isDirectory()
				? getMarkdownFiles(path)
				: entry.name.endsWith(".md")
					? [path]
					: [];
		}),
	);

	return files.flat();
};

const readMarkdown = (contents: string) => {
	const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

	if (!match) return { data: {}, body: contents };

	return { data: parse(match[1]) ?? {}, body: match[2] };
};

const thumbnailLoader = (): Loader => ({
	name: "posts-with-thumbnails",
	async load(context) {
		const baseDirectory = fileURLToPath(
			new URL("../../content/posts/", import.meta.url),
		);
		const rootDirectory = fileURLToPath(context.config.root);

		context.store.clear();

		for (const filePath of await getMarkdownFiles(baseDirectory)) {
			const contents = await readFile(filePath, "utf8");
			const { data, body } = readMarkdown(contents);
			const relativePath = relative(baseDirectory, filePath)
				.split(sep)
				.join("/");
			const id = relativePath.replace(/\.md$/, "");
			const entryData = {
				...data,
				thumbnail: data.thumbnail ?? getFirstImage(body),
			};
			const parsedData = await context.parseData({
				id,
				data: entryData,
				filePath,
			});
			const rendered = await context.renderMarkdown(body, {
				fileURL: pathToFileURL(filePath),
			});

			context.store.set({
				id,
				data: parsedData,
				body,
				filePath: relative(rootDirectory, filePath).split(sep).join("/"),
				digest: context.generateDigest(contents),
				rendered,
				assetImports: rendered.metadata?.imagePaths,
			});
		}
	},
});

export default thumbnailLoader;
