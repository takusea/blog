import { A, createAsync, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { getPosts } from "~/lib/posts";
import { TocView } from "~/components/TocView";
import styles from "./[slug].module.css";
import { DocumentView } from "~/components/DocumentView";
import { TagListView } from "~/components/TagListView";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";

export default function BlogPost() {
	const params = useParams();
	const posts = createAsync(() => getPosts(), { deferStream: true });
	const post = createMemo(() =>
		posts()?.find((post) => post.metadata.slug === params.slug),
	);

	return (
		<Show when={post()} fallback="error">
			{(post) => (
				<MetaProvider>
					<Title>{`${post().metadata.title} - たくしいのこんせき`}</Title>
					<Link
						rel="canonical"
						href={`https://blog.takusea.com/posts/${post().metadata.slug}`}
					/>
					<Meta
						property="og:title"
						content={`${post().metadata.title} - たくしいのこんせき`}
					/>
					<Meta property="og:type" content="article" />
					<Meta
						property="og:url"
						content={`https://blog.takusea.com/posts/${post().metadata.slug}`}
					/>
					<main class={styles.main}>
						<aside class={styles.side}>
							<TocView toc={post().toc} />
						</aside>
						<article class={styles.article}>
							<div class={styles.header}>
								<div class={styles.breadcrumbs}>
									<div class={styles.breadcrumb}>
										<A href="/">ホーム</A>
									</div>
								</div>
								<h1 class={styles.title}>{post().metadata.title}</h1>
								<time
									class={styles.date}
									datetime={post().metadata.date}
									data-pagefind-sort="date[datatime]"
								>
									{post().metadata.date}
								</time>
								<TagListView tags={post().metadata.tags} />
							</div>
							<DocumentView document={post().content} />
						</article>
					</main>
				</MetaProvider>
			)}
		</Show>
	);
}
