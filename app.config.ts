import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		ssr: true,
		preset: "static",
		prerender: {
			crawlLinks: true,
		},
	},
});
