import { createAsync } from "@solidjs/router";
import { For } from "solid-js";
import { getPosts } from "~/lib/posts";
import { A } from "@solidjs/router";
import styles from "./index.module.css";

export default function Index() {
	const posts = createAsync(() => getPosts());

	return (
		<main class={styles.main}>
			<h1 class={styles.title}>たくしいの雑記</h1>
			<p>備忘録と痕跡残し</p>
			<ul class={styles.articles}>
				<For each={posts()}>
					{(post) => (
						<li>
							<A class={styles.article} href={post.data.frontmatter.slug}>
								<div class={styles["article-title"]}>
									{post.data.frontmatter.title}
								</div>
								<div class={styles["article-metadata"]}>
									<time>{post.data.frontmatter.date}</time>
									<For each={post.data.frontmatter.tags}>
										{(tag) => <div class={styles["article-tag"]}>{tag}</div>}
									</For>
								</div>
							</A>
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
