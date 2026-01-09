import type { Root } from "hast";
import { visit } from "unist-util-visit";
import { copyFile } from "../file";

const rehypeRelocateLocalImage = () => {
	return (tree: Root) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "img") return;

			const src = node.properties?.src;

			if (typeof src !== "string" || src === "" || src.startsWith("http")) {
				return;
			}

			if (!src.includes("link-card")) {
				node.properties.src = `/posts/${src}`;
			}

			copyFile(
				`public/${node.properties.src}`,
				`.output/public/${node.properties.src}`,
			);
		});
	};
};

export { rehypeRelocateLocalImage };
