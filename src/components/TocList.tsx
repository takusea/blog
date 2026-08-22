import { For, Show } from "solid-js";
import type { PostToc } from "~/type/post";
import styles from "./TocList.module.css";

type Props = {
	toc: PostToc[];
	activeId?: string;
};

const TocList = (props: Props) => {
	return (
		<ul class={styles.list}>
			<For each={props.toc}>
				{(toc) => (
					<li class={styles.item}>
						<a
							class={styles.link}
							href={`#${toc.id}`}
							data-active={props.activeId === toc.id}
						>
							{toc.value}
						</a>
						<Show when={toc.children}>
							{(child) => <TocList toc={child()} activeId={props.activeId} />}
						</Show>
					</li>
				)}
			</For>
		</ul>
	);
};

export { TocList };
