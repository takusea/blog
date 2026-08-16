import { createEffect, createSignal, For } from "solid-js";
import type { ResultData, ResultType } from "~/type/pagefind";
import { Card } from "./base/Card";
import styles from "./SearchResultView.module.css";

type Props = {
	results: ResultType[];
};

const SearchResultView = (props: Props) => {
	const [results, setResults] = createSignal<ResultData[]>([]);

	createEffect(() => {
		async function fetchData() {
			const resultData = await Promise.all(
				props.results.map((result) => result.data()),
			);

			setResults(resultData);
		}
		fetchData();
	});

	return (
		<ul class={styles.list}>
			<For each={results()}>
				{(data) => (
					<li>
						<a href={data.url}>
							<Card>
								<div class={styles.inner}>
									<h2 class={styles.title}>{data.meta.title}</h2>
									<p class={styles.excerpt} innerHTML={data.excerpt} />
								</div>
							</Card>
						</a>
					</li>
				)}
			</For>
		</ul>
	);
};

export { SearchResultView };
