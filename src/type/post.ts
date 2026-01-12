import type { PostMetadata } from "./postmetadata";
import type { Toc } from "./toc";

export type Post = {
	metadata: PostMetadata;
	toc: Toc[];
	content: string;
};
