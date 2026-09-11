import { h } from "hastscript";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const remarkNote = () => {
	return (tree: Root) => {
		visit(tree, "containerDirective", (node) => {
			const data = node.data ?? {};
			node.data = data;

			const hast = h(node.name, node.attributes ?? {});

			data.hName = "aside";
			data.hProperties = {
				class: ["note", hast.tagName],
			};
		});
	};
};

export default remarkNote;
