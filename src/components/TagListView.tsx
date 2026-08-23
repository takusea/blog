import { For } from "solid-js";
import useSearch from "~/hooks/useSearch";
import styles from "./TagListView.module.css";

type Props = {
	tags: string[];
	asPagefindFilter?: boolean;
};

const TagListView = (props: Props) => {
	const { toggleSelectedTags } = useSearch();

	return (
		<ul class={styles.list}>
			<For each={props.tags}>
				{(tag) => (
					<li
						{...(props.asPagefindFilter
							? { "data-pagefind-filter": `tag:${tag}` }
							: {})}
					>
						<button
							type="button"
							class={styles.item}
							on:click={(e) => {
								e.preventDefault();
								toggleSelectedTags(tag);
							}}
						>
							{tag}
						</button>
					</li>
				)}
			</For>
		</ul>
	);
};

export { TagListView };
