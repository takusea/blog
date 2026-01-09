import { findFiles } from "./file";
import { parseMarkdown } from "./markdown";
import { query } from "@solidjs/router";

const getPosts = query(async () => {
	"use server";

	const results = findFiles("public/posts", "md").map(parseMarkdown);
	return (await Promise.all(results))
		.map((result) => JSON.stringify(result))
		.map((s) => JSON.parse(s));
}, "posts");

export { getPosts };
