import { createAsync, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { getPosts } from "~/lib/posts";
import { TocView } from "~/components/TocView";
import styles from "./slug.module.css";
import { DocumentView } from "~/components/DocumentView";
import { TagListView } from "~/components/TagListView";

export default function BlogPost() {
	const params = useParams();
	const posts = createAsync(() => getPosts());

	return (
		<Show
			when={posts()?.find((post) => post.data.frontmatter.slug === params.slug)}
			fallback="error"
		>
			{(post) => (
				<main class={styles.main}>
					<aside class={styles.side}>
						<TocView toc={post().data.toc} />
					</aside>
					<article class={styles.article}>
						<div class={styles.header}>
							<h1 class={styles.title}>{post().data.frontmatter.title}</h1>
							<time class={styles.date} datetime={post().data.frontmatter.date}>
								{post().data.frontmatter.date}
							</time>
							<TagListView tags={post().data.frontmatter.tags} />
						</div>
						<DocumentView document={post().value} />
					</article>
				</main>
			)}
		</Show>
	);
}
