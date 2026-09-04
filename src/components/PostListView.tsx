import { For, Show } from "solid-js";
import type { PostMetadata } from "~/type/post";
import { Card } from "./base/Card";
import styles from "./PostListView.module.css";
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
						<a href={`/posts/${post.slug}/`} class={styles.link}>
							<Card>
								<Show when={post.thumbnail}>
									<div
										class={styles.background}
										style={{ "--background": `url(${post.thumbnail?.src})` }}
									></div>
								</Show>
								<div class={styles.inner}>
									<h2 class={styles.title}>{post.title}</h2>
									<div class={styles.metadata}>
										<time class={styles.date}>{post.date}</time>
										<TagListView tags={post.tags} />
									</div>
								</div>
							</Card>
						</a>
					</li>
				)}
			</For>
		</ul>
	);
};

export { PostListView };
