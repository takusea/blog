import type { Toc } from "~/type/toc";
import { TocList } from "./TocList";
import styles from "./TocView.module.css";
import { clientOnly } from "@solidjs/start";

const IconList = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconList,
	})),
);

type Props = {
	toc: Toc[];
};

const TocView = (props: Props) => {
	return (
		<nav class={styles.container}>
			<h2 class={styles.header}>
				<IconList />
				目次
			</h2>
			<TocList toc={props.toc} />
		</nav>
	);
};

export { TocView };
