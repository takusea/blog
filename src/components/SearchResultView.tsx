import { createResource, For } from "solid-js";
import type { ResultData, ResultType } from "~/type/pagefind";
import { Card } from "./base/Card";
import styles from "./SearchResultView.module.css";

type Props = {
	results: ResultType[];
};

const SearchResultView = (props: Props) => {
	const [results] = createResource<ResultData[], ResultType[]>(
		() => props.results,
		async (searchResults) =>
			Promise.all(searchResults.map((result) => result.data())),
	);

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
