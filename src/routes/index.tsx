import { createAsync } from "@solidjs/router";
import { For } from "solid-js";
import { getPosts } from "~/lib/posts";

export default function Index() {
	const posts = createAsync(() => getPosts());

	return (
		<main>
			<h1>Blog</h1>
			<ul>
				<For each={posts()}>
					{(post) => (
						<li>
							<a href={`./${post.data.frontmatter.slug}`}>
								{post.data.frontmatter.title}
							</a>
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
