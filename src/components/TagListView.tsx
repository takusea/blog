import { For } from "solid-js";
import styles from "./TagListView.module.css";

type Props = {
	tags: string[];
	onSelect?: (tag: string) => void;
};

const TagListView = (props: Props) => {
	return (
		<ul class={styles.list}>
			<For each={props.tags}>
				{(tag) => (
					<li data-pagefind-filter="tag">
						<button
							type="button"
							class={styles.item}
							on:click={(e) => {
								e.preventDefault();
								props.onSelect?.(tag);
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
