import { getCollection } from "astro:content";
import type { APIContext, APIRoute, Props } from "astro";
import { renderOgImage } from "~/lib/ogp";

export async function getStaticPaths() {
	const posts = await getCollection("posts");
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}

export const GET: APIRoute<Props> = async (context: APIContext) => {
	const post = context.props.post;
	const png = await renderOgImage({
		title: post.data.title,
		tags: post.data.tags,
		thumbnail: post.data.thumbnail
			? new URL(post.data.thumbnail.src, context.url).toString()
			: undefined,
		url: context.url,
	});

	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
