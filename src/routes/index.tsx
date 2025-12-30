import { createAsync } from "@solidjs/router";
import { getPosts } from "~/lib/posts";
import styles from "./index.module.css";
import { PostListView } from "~/components/PostListView";
import { Show } from "solid-js";

export default function Index() {
	const posts = createAsync(() => getPosts());

	return (
		<main class={styles.main}>
			<h1 class={styles.title}>たくしいの雑記</h1>
			<p>備忘録と痕跡残し</p>
			<Show
				when={posts()?.map((post) => post.data.frontmatter)}
				fallback={<p>Loading...</p>}
			>
				{(postMetadatas) => <PostListView posts={postMetadatas()} />}
			</Show>
		</main>
	);
}
