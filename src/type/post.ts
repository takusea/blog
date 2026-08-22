export type PostMetadata = {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	thumbnail: string;
};

export type PostToc = {
	id: string;
	value: string;
	children: PostToc[];
};
