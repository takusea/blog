import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { Match, Show, Switch } from "solid-js";
import { GlobalLayout } from "~/components/layout/GlobalLayout";
import { PostListView } from "~/components/PostListView";
import { ProfileCard } from "~/components/ProfileCard";
import { SearchCard } from "~/components/SearchCard";
import { SearchResultView } from "~/components/SearchResultView";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import useSearch from "~/hooks/useSearch";
import { getPosts } from "~/lib/posts";
import styles from "./index.module.css";

export default function Index() {
	const posts = createAsync(() => getPosts(), { deferStream: true });

	const { results, isSearching } = useSearch();

	return (
		<MetaProvider>
			<Title>たくしいのこんせき</Title>
			<Link rel="canonical" href="https://blog.takusea.com" />
			<Meta
				name="description"
				content="雑記だとか備忘録だとかを残すブログです。たくしいはお絵描き・動画投稿・プログラミング・ゲームなどをするひとです。"
			/>
			<Meta property="og:title" content="たくしいのこんせき" />
			<Meta property="og:type" content="website" />
			<Meta property="og:url" content="https://blog.takusea.com" />
			<Meta property="og:site_name" content="たくしいのこんせき" />
			<Meta
				property="og:description"
				content="雑記だとか備忘録だとかを残すブログです。たくしいはお絵描き・動画投稿・プログラミング・ゲームなどをするひとです。"
			/>
			<Meta property="og:image" content="https://blog.takusea.com/icon.png" />
			<Meta name="twitter:site" content="@takusea" />
			<Meta name="twitter:card" content="summary_large_image" />
			<GlobalLayout
				header={
					<>
						<h1 class={styles.logo} aria-label="たくしいのこんせき" />
						<p>雑記だとか備忘録だとか。</p>
					</>
				}
				sideTop={<SearchCard />}
				sideBottom={
					<>
						<ProfileCard />
						<ThemeSwitcher />
					</>
				}
			>
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
			</GlobalLayout>
		</MetaProvider>
	);
}
