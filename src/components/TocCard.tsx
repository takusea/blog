import { clientOnly } from "@solidjs/start";
import type { Toc } from "~/type/toc";
import styles from "./TocCard.module.css";
import { TocList } from "./TocList";

const IconList = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconList,
	})),
);

type Props = {
	toc: Toc[];
};

const TocCard = (props: Props) => {
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

export { TocCard };
