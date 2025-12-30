import { A } from "@solidjs/router";
import { For } from "solid-js";
import styles from "./PostListView.module.css";
import type { PostMetadata } from "~/type/postmetadata";

type Props = {
	posts: PostMetadata[];
};

const PostListView = (props: Props) => {
	return (
		<ul class={styles.posts}>
			<For each={props.posts}>
				{(post) => (
					<li>
						<A class={styles.post} href={`/${post.slug}`}>
							<div class={styles["post-title"]}>{post.title}</div>
							<div class={styles["post-metadata"]}>
								<time>{post.date}</time>
								<For each={post.tags}>
									{(tag) => <div class={styles["post-tag"]}>{tag}</div>}
								</For>
							</div>
						</A>
					</li>
				)}
			</For>
		</ul>
	);
};

export { PostListView };
