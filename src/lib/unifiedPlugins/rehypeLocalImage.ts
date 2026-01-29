import type { Root } from "hast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

const rehypeRelocateLocalImage = () => {
	return (tree: Root, vfile: VFile) => {
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

			node.properties.src = `/posts/${src}`;
			node.properties.class = "u-photo";

			if (!vfile.data.thumbnail) {
				vfile.data.thumbnail = node.properties.src;
			}
		});
	};
};

export default rehypeRelocateLocalImage;
