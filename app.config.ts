import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@solidjs/start/config";
import solidStartSiteMapPlugin from "solid-start-sitemap";

const getPostSlugs = () => {
	return fs
		.readdirSync(path.join(process.cwd(), "public/posts"), {
			withFileTypes: true,
		})
		.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
		.map((file) => path.parse(file.name).name);
};

export default defineConfig({
	server: {
		ssr: false,
		preset: "static",
		prerender: {
			crawlLinks: true,
		},
	},
	vite: {
		plugins: [
			solidStartSiteMapPlugin({
				hostname: "https://blog.takusea.com",
				replaceRouteParams: {
					":slug": getPostSlugs(),
				},
				limit: 5000,
			}),
		],
	},
});
