import path from "node:path";
import { query } from "@solidjs/router";
import type { Post } from "~/type/post";
import type { PostMetadata } from "~/type/postmetadata";
import type { Toc } from "~/type/toc";
import { findFiles, readFile } from "./file";
import { parseMarkdown } from "./markdown";

const getPosts = query(async (): Promise<Post[]> => {
	"use server";

	const files = findFiles("public/posts", "md");
	const fileNames = files.map((file) => path.parse(file).name);

	return (await Promise.all(files.map(readFile).map(parseMarkdown)))
		.map((result, i) => {
			return {
				content: result.value.toString(),
				metadata: {
					...(result.data.frontmatter as PostMetadata),
					slug: encodeURI(fileNames[i]),
				} as PostMetadata,
				toc: result.data.toc as Toc[],
			};
		})
		.toSorted(
			(a, b) =>
				new Date(b.metadata.date).getTime() -
				new Date(a.metadata.date).getTime(),
		);
}, "posts");

export { getPosts };
