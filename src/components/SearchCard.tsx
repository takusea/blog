import { clientOnly } from "@solidjs/start";
import { createEffect, createSignal, Show } from "solid-js";
import useSearch from "~/hooks/useSearch";
import { Button } from "./base/Button";
import { Card } from "./base/Card";
import styles from "./SearchCard.module.css";
import { TagListView } from "./TagListView";

const TextField = clientOnly(() =>
	import("~/components/base/TextField").then((m) => ({
		default: m.TextField,
	})),
);

const IconSearch = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconSearch,
	})),
);

const IconDotsVertical = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconDotsVertical,
	})),
);

const IconArrowsSort = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconArrowsSort,
	})),
);

const IconTag = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconTag,
	})),
);

const SearchCard = () => {
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
		<Card>
			<div class={styles.card}>
				<div class={styles.search}>
					<TextField
						placeholder="検索"
						value={searchParams().query ?? ""}
						start={<IconSearch />}
						onInput={(e) => setQuery(e.currentTarget.value)}
					/>
					<Button
						variant={detailShowed() ? "primary" : "default"}
						onClick={() => setDetailShowed(!detailShowed())}
					>
						<IconDotsVertical />
					</Button>
				</div>
				<Show when={searchParams().tags.length !== 0}>
					<div class={styles.tags}>
						<IconTag />
						<TagListView
							tags={searchParams().tags}
							onSelect={toggleSelectedTags}
						/>
					</div>
				</Show>
				<Show when={detailShowed()}>
					<hr class={styles.line} />
					<div class={styles.column}>
						<div class={styles.label}>
							<IconTag />
							タグ一覧
						</div>
						<TagListView
							tags={tagList().filter(
								(tag) => !searchParams().tags.includes(tag),
							)}
							onSelect={toggleSelectedTags}
						/>
					</div>
					<div class={styles.column}>
						<div class={styles.label}>
							<IconArrowsSort />
							並び替え
						</div>
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
		</Card>
	);
};

export { SearchCard };
