import { createAsync, useParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import { getPosts } from "~/lib/posts";

type Toc = {
	id: string;
	value: string;
	children: Toc[];
};

type Props = {
	toc: Toc[];
};

const TocListView = (props: Props) => {
	return (
		<ul>
			<For each={props.toc}>
				{(toc) => (
					<li>
						<a href={`#${toc.id}`}>{toc.value}</a>
						<Show when={toc.children}>
							{(child) => <TocListView toc={child()} />}
						</Show>
					</li>
				)}
			</For>
		</ul>
	);
};

export default function BlogPost() {
	const params = useParams();
	const posts = createAsync(() => getPosts());

	return (
		<Show
			when={posts()?.find((post) => post.data.frontmatter.slug === params.slug)}
			fallback="error"
		>
			{(post) => (
				<article>
					<nav>
						<TocListView toc={post().data.toc} />
					</nav>
					<h1>{post().data.frontmatter.title}</h1>
					<time datetime={post().data.frontmatter.date}>
						{post().data.frontmatter.date}
					</time>
					<div innerHTML={post().value} />
				</article>
			)}
		</Show>
	);
}
