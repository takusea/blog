import styles from "./SearchBar.module.css";
import { createEffect, Show } from "solid-js";
import { TextField } from "./TextField";
import { TagListView } from "./TagListView";
import useSearch from "~/hooks/useSearch";
import { Button } from "./Button";
import { createSignal } from "solid-js";
import type { PagefindWindow } from "~/lib/pagefind";

declare const window: PagefindWindow;

const SearchBar = () => {
	const [detailShowed, setDetailShowed] = createSignal(false);

	const [tagList, setTagList] = createSignal<string[]>([]);

	const fetchTagList = async () => {
		if (!window.pagefind) return;

		const filters = await window.pagefind.filters();
		setTagList(Object.keys(filters.tag));
	};

	createEffect(() => {
		fetchTagList();
	});

	const { searchParams, setQuery, toggleSelectedTags, setOrderType } =
		useSearch();

	return (
		<div class={styles.card}>
			<div class={styles.top}>
				<TextField
					placeholder="検索"
					value={searchParams().query ?? ""}
					onInput={(e) => setQuery(e.currentTarget.value)}
				/>
				<Button
					variant={detailShowed() ? "primary" : "default"}
					onClick={() => setDetailShowed(!detailShowed())}
				>
					詳細
				</Button>
			</div>
			<Show when={searchParams().tags.length !== 0}>
				<TagListView tags={searchParams().tags} onSelect={toggleSelectedTags} />
			</Show>
			<Show when={detailShowed()}>
				<hr class={styles.line} />
				<TagListView
					tags={tagList().filter((tag) => !searchParams().tags.includes(tag))}
					onSelect={toggleSelectedTags}
				/>
				<div class={styles.order}>
					<span>並び替え</span>
					<Button
						variant={
							searchParams().order === "relevance" ? "primary" : "default"
						}
						onClick={() => setOrderType("relevance")}
					>
						関連度順
					</Button>
					<Button
						variant={searchParams().order === "newer" ? "primary" : "default"}
						onClick={() => setOrderType("newer")}
					>
						日付順（新しい）
					</Button>
					<Button
						variant={searchParams().order === "older" ? "primary" : "default"}
						onClick={() => setOrderType("older")}
					>
						日付順（古い）
					</Button>
				</div>
			</Show>
		</div>
	);
};

export { SearchBar };
