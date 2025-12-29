import { getPosts } from "~/lib/posts";

export default function Index() {
	const posts = getPosts();

	return (
		<main>
			<h1>Blog</h1>
			<ul>
				{posts.map((p) => (
					<li>
						<a href={`./${p.slug}`}>{p.title}</a>
					</li>
				))}
			</ul>
		</main>
	);
}
