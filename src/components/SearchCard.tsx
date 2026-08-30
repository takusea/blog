import {
	IconArrowsSort,
	IconDotsVertical,
	IconSearch,
	IconTag,
} from "@tabler/icons-solidjs";
import { createEffect, createSignal, Show } from "solid-js";
import useSearch from "~/hooks/useSearch";
import { Button } from "./base/Button";
import { Card } from "./base/Card";
import { TextField } from "./base/TextField";
import styles from "./SearchCard.module.css";
import { TagListView } from "./TagListView";

const SearchCard = () => {
	let textField!: HTMLInputElement;
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

	const { searchParams, setQuery, setOrderType } = useSearch();

	createEffect(() => {
		if (textField && searchParams().query !== "") {
			textField.focus();
		}
	});

	return (
		<Card>
			<div class={styles.card}>
				<div class={styles.search}>
					<TextField
						type="search"
						placeholder="サイト内を検索"
						value={searchParams().query}
						start={IconSearch}
						onChange={(e) => setQuery(e.currentTarget.value)}
						ref={textField}
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
						<TagListView tags={searchParams().tags} />
					</div>
				</Show>
				<div class={styles.detail} data-show={detailShowed()}>
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
						/>
					</div>
					<div class={styles.column}>
						<div class={styles.label}>
							<IconArrowsSort />
							並び替え
						</div>
						<Button
							variant={
								searchParams().order === "relevance" || !searchParams().order
									? "primary"
									: "default"
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
				</div>
			</div>
		</Card>
	);
};

export { SearchCard };
