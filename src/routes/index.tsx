import { createAsync } from "@solidjs/router";
import { getPosts } from "~/lib/posts";
import styles from "./index.module.css";
import { PostListView } from "~/components/PostListView";
import { Match, Show, Switch } from "solid-js";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { SearchResultView } from "~/components/SearchResultView";
import useSearch from "~/hooks/useSearch";
import { SearchBar } from "~/components/SearchBar";
import { Profile } from "~/components/Profile";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";

export default function Index() {
	const posts = createAsync(() => getPosts(), { deferStream: true });

	const { results, isSearching } = useSearch();

	return (
		<MetaProvider>
			<Title>たくしいのこんせき</Title>
			<Link rel="canonical" href="https://blog.takusea.com" />
			<Meta property="og:title" content="たくしいの雑記" />
			<Meta property="og:type" content="website" />
			<Meta property="og:url" content="https://blog.takusea.com" />
			<main class={styles.main} data-pagefind-ignore>
				<aside class={styles.side}>
					<div class={styles.search}>
						<SearchBar />
					</div>
					<div class={styles.profile}>
						<Profile />
					</div>
					<div>
						<ThemeSwitcher />
					</div>
				</aside>
				<div class={styles.header}>
					<h1 class={styles.title}>たくしいのこんせき</h1>
					<p>雑記だとか備忘録だとか。</p>
				</div>
				<div class={styles.wrapper}>
					<Show
						when={posts()?.map((post) => post.metadata)}
						fallback={<p>Loading...</p>}
					>
						{(postMetadatas) => (
							<Switch
								fallback={
									<div class={styles.empty}>
										<div class={styles["empty-image"]} />
										<p class={styles["empty-text"]}>
											記事が見つかりませんでした。
										</p>
									</div>
								}
							>
								<Match when={!isSearching()}>
									<PostListView posts={postMetadatas()} />
								</Match>
								<Match when={results().length !== 0}>
									<SearchResultView results={results()} />
								</Match>
							</Switch>
						)}
					</Show>
				</div>
			</main>
		</MetaProvider>
	);
}
