import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type Post = {
	title: string;
	slug: string;
	date: string;
	content: string;
};

export function getPosts(): Post[] {
	return fs.readdirSync(POSTS_DIR).map((file) => {
		const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
		const { data, content } = matter(raw);
		return {
			title: data.title,
			slug: data.slug,
			date: data.date,
			content,
		};
	});
}
