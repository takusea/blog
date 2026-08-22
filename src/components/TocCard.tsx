import { IconList } from "@tabler/icons-solidjs";
import { createSignal, onCleanup, onMount } from "solid-js";
import type { PostToc } from "~/type/post";
import { Card } from "./base/Card";
import styles from "./TocCard.module.css";
import { TocList } from "./TocList";

type Props = {
	toc: PostToc[];
};

const flattenToc = (tocs: PostToc[] = []): PostToc[] => {
	return tocs.flatMap((toc) => [toc, ...flattenToc(toc.children)]);
};

const TocCard = (props: Props) => {
	const [activeId, setActiveId] = createSignal<string>();

	onMount(() => {
		const tocQuery = flattenToc(props.toc)
			.map((t) => `#${t.id}`)
			.join(",");

		if (tocQuery === "") {
			return;
		}

		const headings = document.querySelectorAll(tocQuery);

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
