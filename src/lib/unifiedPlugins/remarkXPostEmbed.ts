import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const getXPostId = (url: string): string | null => {
	try {
		const parsed = new URL(url);
		const hostname = parsed.hostname.replace(/^www\./, "");

		if (hostname !== "x.com" && hostname !== "twitter.com") {
			return null;
		}

		const path = parsed.pathname.split("/").filter(Boolean);
		const statusIndex = path.indexOf("status");

		if (statusIndex === -1 || statusIndex + 1 >= path.length) {
			return null;
		}

		return path[statusIndex + 1] || null;
	} catch {
		return null;
	}
};

const remarkXPostEmbed = () => {
	return (tree: Root) => {
		visit(tree, "link", (node, index, parent) => {
			if (!parent || index === undefined || index === null) {
				return;
			}

			const postId = getXPostId(node.url);
			if (!postId) {
				return;
			}

			parent.children[index] = {
				type: "html",
				value: `
					<div class="x-post-embed" data-x-post-url="${node.url}">
						<blockquote class="twitter-tweet" data-conversation="none">
							<a href="${node.url}">X post</a>
						</blockquote>
					</div>`,
			};
		});
	};
};

export default remarkXPostEmbed;
