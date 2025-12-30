import { For } from "solid-js";
import styles from "./TagListView.module.css";

type Props = {
	tags: string[];
};

const TagListView = (props: Props) => {
	return (
		<ul class={styles.list}>
			<For each={props.tags}>{(tag) => <li class={styles.item}>{tag}</li>}</For>
		</ul>
	);
};

export { TagListView };
