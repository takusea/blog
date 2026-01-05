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
			<Title>たくしいのこんせき</Title>
			<Link rel="canonical" href="https://blog.takusea.com/" />
			<Meta property="og:title" content="たくしいの雑記" />
			<Meta property="og:type" content="website" />
			<Meta property="og:url" content="https://blog.takusea.com/" />
			<main class={styles.main}>
				<h1 class={styles.title}>たくしいのこんせき</h1>
				<p>雑記だとか備忘録だとか。</p>
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
