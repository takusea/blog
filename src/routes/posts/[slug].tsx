import { A, createAsync, useNavigate, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { getPosts } from "~/lib/posts";
import { TocView } from "~/components/TocView";
import styles from "./[slug].module.css";
import { DocumentView } from "~/components/DocumentView";
import { TagListView } from "~/components/TagListView";
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import { Profile } from "~/components/Profile";

const IconChevronRight = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconChevronRight,
	})),
);

const IconTag = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconTag,
	})),
);

const IconCalendar = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconCalendar,
	})),
);

export default function BlogPost() {
	const params = useParams();
	const navigate = useNavigate();

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
						<div class={styles.header}>
							<div class={styles.breadcrumbs}>
								<A href="/" class={styles.breadcrumb}>
									ホーム
								</A>
								<IconChevronRight />
							</div>
							<h1 class={styles.title}>{post().metadata.title}</h1>
							<div class={styles.metadata}>
								<time
									class={styles.date}
									datetime={post().metadata.date}
									data-pagefind-sort="date[datatime]"
								>
									<IconCalendar />
									{post().metadata.date}
								</time>
								<div class={styles.tag}>
									<IconTag />
									<TagListView
										tags={post().metadata.tags}
										onSelect={(tag) => navigate(`/?tags=${encodeURI(tag)}`)}
									/>
								</div>
							</div>
						</div>
						<aside class={styles.side}>
							<div class={styles.toc}>
								<TocView toc={post().toc} />
							</div>
							<div class={styles.profile}>
								<Profile />
							</div>
						</aside>
						<article class={styles.article}>
							<DocumentView document={post().content} />
						</article>
					</main>
				</MetaProvider>
			)}
		</Show>
	);
}
