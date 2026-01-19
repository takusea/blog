import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { A, createAsync, useNavigate, useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createMemo, Show } from "solid-js";
import { DocumentView } from "~/components/DocumentView";
import { GlobalLayout } from "~/components/layout/GlobalLayout";
import { ProfileCard } from "~/components/ProfileCard";
import { TagListView } from "~/components/TagListView";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { TocCard } from "~/components/TocCard";
import { getPosts } from "~/lib/posts";
import styles from "./[slug].module.css";

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
					<GlobalLayout
						header={
							<>
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
							</>
						}
						sideTop={<TocCard toc={post().toc} />}
						sideBottom={
							<>
								<ProfileCard />
								<ThemeSwitcher />
							</>
						}
					>
						<DocumentView document={post().content} />
					</GlobalLayout>
				</MetaProvider>
			)}
		</Show>
	);
}
