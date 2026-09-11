import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const getYouTubeVideoId = (url: string): string | null => {
	try {
		const parsed = new URL(url);
		const hostname = parsed.hostname.replace(/^www\./, "");

		if (hostname === "youtu.be") {
			return parsed.pathname.slice(1).split("/")[0] || null;
		}

		if (hostname === "youtube.com" || hostname === "m.youtube.com") {
			if (parsed.searchParams.has("v")) {
				return parsed.searchParams.get("v");
			}

			const path = parsed.pathname.replace(/^\//, "");
			if (path.startsWith("shorts/")) {
				return path.slice("shorts/".length).split("/")[0] || null;
			}
		}

		return null;
	} catch {
		return null;
	}
};

const remarkYouTubeEmbed = () => {
	return (tree: Root) => {
		visit(tree, "link", (node, index, parent) => {
			if (!parent || index === undefined || index === null) {
				return;
			}

			const videoId = getYouTubeVideoId(node.url);
			if (!videoId) {
				return;
			}

			parent.children[index] = {
				type: "html",
				value: `
					<div class="youtube-embed">
						<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
					</div>`,
			};
		});
	};
};

export default remarkYouTubeEmbed;
