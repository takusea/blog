import { clientOnly } from "@solidjs/start";
import { createSignal, onCleanup, onMount } from "solid-js";
import type { Toc } from "~/type/toc";
import { Card } from "./base/Card";
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

const flattenToc = (tocs: Toc[] = []): Toc[] => {
	return tocs.flatMap((toc) => [toc, ...flattenToc(toc.children)]);
};

const TocCard = (props: Props) => {
	const [activeId, setActiveId] = createSignal<string>();

	onMount(() => {
		const headings = document.querySelectorAll(
			flattenToc(props.toc)
				.map((t) => `#${t.id}`)
				.join(","),
		);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					setActiveId(visible[0].target.id);
				}
			},
			{
				rootMargin: "0px 0px -90% 0px",
				threshold: 0,
			},
		);

		headings.forEach((h) => {
			observer.observe(h);
		});

		onCleanup(() => observer.disconnect());
	});

	return (
		<Card>
			<nav class={styles.container}>
				<h2 class={styles.header}>
					<IconList />
					目次
				</h2>
				<TocList toc={props.toc} activeId={activeId()} />
			</nav>
		</Card>
	);
};

export { TocCard };
