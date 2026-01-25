import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		ssr: false,
		preset: "static",
		prerender: {
			crawlLinks: true,
		},
	},
});
