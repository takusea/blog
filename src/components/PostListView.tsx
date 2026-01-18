import { A } from "@solidjs/router";
import { For } from "solid-js";
import styles from "./PostListView.module.css";
import type { PostMetadata } from "~/type/postmetadata";
import { TagListView } from "./TagListView";
import useSearch from "~/hooks/useSearch";

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
						<A class={styles.item} href={`/posts/${post.slug}`}>
							<h2 class={styles.title}>{post.title}</h2>
							<div class={styles.metadata}>
								<time class={styles.date}>{post.date}</time>
								<TagListView tags={post.tags} onSelect={toggleSelectedTags} />
							</div>
						</A>
					</li>
				)}
			</For>
		</ul>
	);
};

export { PostListView };
