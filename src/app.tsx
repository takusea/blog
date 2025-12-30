import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createEffect, Suspense } from "solid-js";
import "destyle.css";
import "./app.css";
import { getCurrentHue } from "./lib/hue";

export default function App() {
	createEffect(() => {
		const hue = getCurrentHue();
		document.documentElement.style.setProperty("--hue", hue.toString());
	});

	return (
		<Router
			root={(props) => <Suspense>{props.children}</Suspense>}
			base="/blog"
		>
			<FileRoutes />
		</Router>
	);
}
