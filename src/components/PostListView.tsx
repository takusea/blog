import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import useSearch from "~/hooks/useSearch";
import type { PostMetadata } from "~/type/postmetadata";
import { Card } from "./base/Card";
import styles from "./PostListView.module.css";
import { TagListView } from "./TagListView";

type Props = {
	posts: PostMetadata[];
};

const PostListView = (props: Props) => {
	const { toggleSelectedTags } = useSearch();

	return (
		<ul class={styles.list}>
			<For each={props.posts}>
				{(post) => (
					<li>
						<A href={`/posts/${post.slug}`}>
							<Card>
								<Show when={post.thumbnail}>
									<div
										class={styles.background}
										style={{ "--background": `url(${post.thumbnail})` }}
									></div>
								</Show>
								<div class={styles.inner}>
									<h2 class={styles.title}>{post.title}</h2>
									<div class={styles.metadata}>
										<time class={styles.date}>{post.date}</time>
										<TagListView
											tags={post.tags}
											onSelect={toggleSelectedTags}
										/>
									</div>
								</div>
							</Card>
						</A>
					</li>
				)}
			</For>
		</ul>
	);
};

export { PostListView };
