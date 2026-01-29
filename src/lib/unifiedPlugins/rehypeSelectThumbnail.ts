import type { Root } from "hast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

const rehypeSelectThumbnail = () => {
	return (tree: Root, vfile: VFile) => {
		visit(tree, "element", (node) => {
			if (vfile.data.thumbnail) return;

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

			vfile.data.thumbnail = node.properties.src;
		});
	};
};

export { rehypeSelectThumbnail };
