import type { Toc } from "~/type/toc";
import { TocList } from "./TocList";
import styles from "./TocView.module.css";

type Props = {
	toc: Toc[];
};

const TocView = (props: Props) => {
	return (
		<nav class={styles.container}>
			<h2 class={styles.header}>目次</h2>
			<TocList toc={props.toc} />
		</nav>
	);
};

export { TocView };
