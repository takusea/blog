import { useParams } from "@solidjs/router";
import { getPosts } from "~/lib/posts";

export default function BlogPost() {
	const params = useParams();
	const post = getPosts().find((p) => p.slug === params.slug);

	return (
		<article>
			<h1>{post?.title}</h1>
			<pre>{post?.content}</pre>
		</article>
	);
}
