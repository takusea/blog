import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://blog.takusea.com",
	trailingSlash: "always",
	output: "static",
	integrations: [solid()],
	vite: {
		server: {
			host: "0.0.0.0",
		},
	},
});
