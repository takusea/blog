import { IconNews } from "@tabler/icons-solidjs";
import type { PostMetadata } from "~/type/post";
import { Card } from "./base/Card";
import styles from "./LatestPostsCard.module.css";
import { PostListView } from "./PostListView";

type Props = {
	posts: PostMetadata[];
};

const LatestPostsCard = (props: Props) => {
	return (
		<Card>
			<div class={styles.container}>
				<h2 class={styles.header}>
					<IconNews />
					最新の記事
				</h2>
				<PostListView posts={props.posts} />
			</div>
		</Card>
	);
};

export { LatestPostsCard };
