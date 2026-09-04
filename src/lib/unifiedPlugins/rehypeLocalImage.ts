import type { Root } from "hast";
import { visit } from "unist-util-visit";

const rehypeLocalImage = () => {
	return (tree: Root) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "img") return;

			const src = node.properties?.src;

			if (
				typeof src !== "string" ||
				src === "" ||
				src.startsWith("http") ||
				src.includes("link-card")
			) {
				return;
			}

			node.properties.class = "u-photo";
		});
	};
};

export default rehypeLocalImage;
