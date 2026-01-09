import { A } from "@solidjs/router";
import { For } from "solid-js";
import styles from "./PostListView.module.css";
import type { PostMetadata } from "~/type/postmetadata";
import { TagListView } from "./TagListView";

type Props = {
	posts: PostMetadata[];
};

const PostListView = (props: Props) => {
	return (
		<ul class={styles.list}>
			<For each={props.posts}>
				{(post) => (
					<li>
						<A class={styles.item} href={`/posts/${post.slug}`}>
							<div class={styles.title}>{post.title}</div>
							<div class={styles.metadata}>
								<time class={styles.date}>{post.date}</time>
								<TagListView tags={post.tags} />
							</div>
						</A>
					</li>
				)}
			</For>
		</ul>
	);
};

export { PostListView };
