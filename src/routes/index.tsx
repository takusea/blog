import { createAsync } from "@solidjs/router";
import { getPosts } from "~/lib/posts";
import styles from "./index.module.css";
import { PostListView } from "~/components/PostListView";
import { Show } from "solid-js";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
// import { SearchField } from "~/components/SearchField";

export default function Index() {
	const posts = createAsync(() => getPosts(), { deferStream: true });

	return (
		<MetaProvider>
			<Title>"たくしいの雑記"</Title>
			<Link rel="canonical" href="https://takusea.com/blog/" />
			<Meta property="og:title" content="たくしいの雑記" />
			<Meta property="og:type" content="website" />
			<Meta property="og:url" content="https://takusea.com/blog/" />
			<main class={styles.main}>
				<h1 class={styles.title}>たくしいの雑記</h1>
				<p>備忘録と痕跡残し</p>
				{/* <SearchField /> */}
				<Show
					when={posts()?.map((post) => post.data.frontmatter)}
					fallback={<p>Loading...</p>}
				>
					{(postMetadatas) => <PostListView posts={postMetadatas()} />}
				</Show>
			</main>
		</MetaProvider>
	);
}
