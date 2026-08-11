import fs from "node:fs";
import path from "node:path";
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import solidStartSiteMapPlugin from "solid-start-sitemap";
import { defineConfig } from "vite";

const getPostSlugs = () => {
	return fs
		.readdirSync(path.join(process.cwd(), "public/posts"), {
			withFileTypes: true,
		})
		.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
		.map((file) => path.parse(file.name).name);
};

export default defineConfig({
	plugins: [
		solidStartSiteMapPlugin({
			hostname: "https://blog.takusea.com",
			replaceRouteParams: {
				":slug": getPostSlugs(),
			},
			limit: 5000,
		}),
		solidStart(),
		nitro(),
	],
	nitro: {
		preset: "static",
		prerender: {
			crawlLinks: true,
		},
	},
});
