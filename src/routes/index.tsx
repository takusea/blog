import { createAsync } from "@solidjs/router";
import { getPosts } from "~/lib/posts";
import styles from "./index.module.css";
import { PostListView } from "~/components/PostListView";
import { createEffect, createSignal, Show } from "solid-js";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { TextField } from "~/components/TextField";
import type { PagefindWindow, ResultType } from "~/lib/pagefind";
import { SearchResultView } from "~/components/SearchResultView";

declare const window: PagefindWindow;

export default function Index() {
	const posts = createAsync(() => getPosts(), { deferStream: true });

	const [results, setResults] = createSignal<ResultType[]>([]);
	const [query, setQuery] = createSignal<string>("");

	async function handleSearch(query: string) {
		if (!window.pagefind) {
			return;
		}

		const search = await window.pagefind.search(query);
		setResults(search.results);
	}

	createEffect(() => {
		handleSearch(query());
	});

	return (
		<MetaProvider>
			<Title>たくしいのこんせき</Title>
			<Link rel="canonical" href="https://blog.takusea.com" />
			<Meta property="og:title" content="たくしいの雑記" />
			<Meta property="og:type" content="website" />
			<Meta property="og:url" content="https://blog.takusea.com" />
			<main class={styles.main} data-pagefind-ignore>
				<h1 class={styles.title}>たくしいのこんせき</h1>
				<p>雑記だとか備忘録だとか。</p>
				<TextField
					placeholder="検索"
					value={query()}
					onInput={(e) => setQuery(e.currentTarget.value)}
				/>
				<Show
					when={posts()?.map((post) => post.metadata)}
					fallback={<p>Loading...</p>}
				>
					{(postMetadatas) => (
						<Show
							when={query() !== ""}
							fallback={<PostListView posts={postMetadatas()} />}
						>
							<SearchResultView results={results()} />
						</Show>
					)}
				</Show>
			</main>
		</MetaProvider>
	);
}
