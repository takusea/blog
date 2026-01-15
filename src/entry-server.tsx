// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { Show } from "solid-js";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="ja">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					<Show when={import.meta.env.PROD}>
						<script src="/pagefind/pagefind.js" type="module" defer />
						<script
							type="module"
							innerHTML={`
              import * as pagefind from "/pagefind/pagefind.js";
              window.pagefind = pagefind;
            `}
							defer
						/>
					</Show>
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
