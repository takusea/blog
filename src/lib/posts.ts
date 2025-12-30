import path from "node:path";
import { findFiles } from "./file";
import { parseMarkdown } from "./markdown";
import { query } from "@solidjs/router";

const POSTS_DIR = path.join(process.cwd(), "posts");

const getPosts = query(async () => {
	"use server";

	const results = findFiles(POSTS_DIR, "md").map(parseMarkdown);
	return (await Promise.all(results))
		.map((result) => JSON.stringify(result))
		.map((s) => JSON.parse(s));
}, "posts");

export { getPosts };
