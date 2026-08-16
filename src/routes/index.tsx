import { Match, Switch } from "solid-js";
import { PostListView } from "~/components/PostListView";
import { SearchResultView } from "~/components/SearchResultView";
import useSearch from "~/hooks/useSearch";
import type { PostMetadata } from "~/type/postmetadata";
import styles from "./index.module.css";

type Props = {
	posts: PostMetadata[];
};

export default function Index(props: Props) {
	const { results, isSearching } = useSearch();

	return (
		<Switch
			fallback={
				<div class={styles.empty}>
					<div class={styles["empty-image"]} />
					<p class={styles["empty-text"]}>記事が見つかりませんでした。</p>
				</div>
			}
		>
			<Match when={!isSearching()}>
				<PostListView posts={props.posts} />
			</Match>
			<Match when={results().length !== 0}>
				<SearchResultView results={results()} />
			</Match>
		</Switch>
	);
}
