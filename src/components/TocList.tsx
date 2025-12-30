import { For, Show } from "solid-js";
import type { Toc } from "~/type/toc";
import styles from "./TocList.module.css";

type Props = {
	toc: Toc[];
};

const TocList = (props: Props) => {
	return (
		<ul class={styles.list}>
			<For each={props.toc}>
				{(toc) => (
					<li class={styles.item}>
						<a class={styles.link} href={`#${toc.id}`}>
							{toc.value}
						</a>
						<Show when={toc.children}>
							{(child) => <TocList toc={child()} />}
						</Show>
					</li>
				)}
			</For>
		</ul>
	);
};

export { TocList };
