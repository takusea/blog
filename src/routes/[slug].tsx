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
		posts()?.find((post) => post.data.frontmatter.slug === params.slug),
	);

	return (
		<Show when={post()} fallback="error">
			{(post) => (
				<MetaProvider>
					<Title>{`${post().data.frontmatter.title} - たくしいの雑記`}</Title>
					<Link
						rel="canonical"
						href={`https://takusea.com/blog/${post().data.frontmatter.slug}`}
					/>
					<Meta
						property="og:title"
						content={`${post().data.frontmatter.title} - たくしいの雑記`}
					/>
					<Meta property="og:type" content="article" />
					<Meta
						property="og:url"
						content={`https://takusea.com/blog/${post().data.frontmatter.slug}`}
					/>
					<main class={styles.main}>
						<aside class={styles.side}>
							<TocView toc={post().data.toc} />
						</aside>
						<article class={styles.article}>
							<div class={styles.header}>
								<div class={styles.breadcrumbs}>
									<div class={styles.breadcrumb}>
										<A href="/">ホーム</A>
									</div>
								</div>
								<h1 class={styles.title}>{post().data.frontmatter.title}</h1>
								<time
									class={styles.date}
									datetime={post().data.frontmatter.date}
								>
									{post().data.frontmatter.date}
								</time>
								<TagListView tags={post().data.frontmatter.tags} />
							</div>
							<DocumentView document={post().value} />
						</article>
					</main>
				</MetaProvider>
			)}
		</Show>
	);
}
