import fs from "node:fs";
import path from "node:path";
import type { Root } from "hast";
import { visit } from "unist-util-visit";

type Options = {
	baseUrl: string;
	sourceDir: string;
	destinationDir: string;
};

const rehypeRelocateLocalImage = (options: Options) => {
	return (tree: Root) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "img") return;
			const src = node.properties?.src;
			if (typeof src !== "string") return;
			if (src === "") return;
			if (src.startsWith("http")) return;

			copyImage(
				`/${options.sourceDir}/${src}`,
				`/${options.destinationDir}/${src}`,
			);

			node.properties.src = `/${options.baseUrl}/post-images/${src}`;
		});
	};
};

const copyImage = (sourceDir: string, destinationDir: string) => {
	const from = path.join(process.cwd(), sourceDir);
	const to = path.join(process.cwd(), destinationDir);

	fs.mkdirSync(path.dirname(to), { recursive: true });

	if (fs.existsSync(from) && !fs.existsSync(to)) {
		fs.copyFileSync(from, to);
	}
};

export { rehypeRelocateLocalImage };
