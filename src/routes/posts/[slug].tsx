import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { A, createAsync, useNavigate, useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createMemo, Show } from "solid-js";
import { DocumentView } from "~/components/DocumentView";
import { LatestPostsCard } from "~/components/LatestPostsCard";
import { GlobalLayout } from "~/components/layout/GlobalLayout";
import { ProfileCard } from "~/components/ProfileCard";
import { SearchCard } from "~/components/SearchCard";
import { TagListView } from "~/components/TagListView";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { TocCard } from "~/components/TocCard";
import { getPosts } from "~/lib/posts";
import styles from "./[slug].module.css";

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
					<Meta property="og:site_name" content="たくしいのこんせき" />
					<Meta name="twitter:site" content="@takusea" />
					<Meta name="twitter:card" content="summary" />
					<div class="h-entry">
						<Show when={post().metadata.thumbnail}>
							<div
								class={styles.background}
								style={{ "--background": `url(${post().metadata.thumbnail})` }}
							></div>
						</Show>
						<GlobalLayout
							header={
								<>
									<A
										href="/"
										class={styles.logo}
										aria-label="たくしいのこんせき"
									/>
									<h1 class={`${styles.title} `}>{post().metadata.title}</h1>
									<div class={styles.metadata}>
										<time
											class={`${styles.date} dt-published`}
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
							sideTop={
								<>
									<SearchCard />
									<Show when={post().toc.length !== 0}>
										<TocCard toc={post().toc} />
									</Show>
								</>
							}
							sideBottom={
								<>
									<Show when={posts()}>
										{(posts) => (
											<LatestPostsCard
												posts={posts()
													?.map((p) => p.metadata)
													.filter((p) => p.slug !== post().metadata.slug)
													.toSpliced(5)}
											/>
										)}
									</Show>
									<ProfileCard />
									<ThemeSwitcher />
								</>
							}
						>
							<div class="e-content">
								<DocumentView document={post().content} />
							</div>
						</GlobalLayout>
						{/** biome-ignore lint/a11y/useAnchorContent: <explanation> */}
						<a
							style="display: none;"
							class="u-bridgy-fed"
							href="https://fed.brid.gy/"
						></a>
					</div>
				</MetaProvider>
			)}
		</Show>
	);
}
