import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		baseURL: "/blog/",
		preset: "static",
		prerender: {
			crawlLinks: true,
		},
	},
});
