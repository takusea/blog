import { clientOnly } from "@solidjs/start";
import { Card } from "./base/Card";
import styles from "./ProfileCard.module.css";

const IconBrandBluesky = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconBrandBluesky,
	})),
);

const IconBrandGithub = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconBrandGithub,
	})),
);

const IconBrandX = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconBrandX,
	})),
);

const IconBrandYoutube = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconBrandYoutube,
	})),
);

const IconDeviceTv = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconDeviceTv,
	})),
);

const IconUserCircle = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconUserCircle,
	})),
);

const ProfileCard = () => {
	return (
		<Card>
			<div class={`${styles.inner} h-card`}>
				<img src="/icon.png" alt="" class={`${styles.icon} u-photo`} />
				<a href="/" class={`${styles.name} u-url u-uid p-name`} rel="me">
					たくしい / Takusea
				</a>
				<p class={`${styles.description} p-note`}>
					お絵描き・動画投稿・プログラミング・ゲームなどをするひとです。
				</p>
				<div class={styles.snslist}>
					<a
						href="https://takusea.com"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="profile"
					>
						<IconUserCircle />
					</a>
					<a
						href="https://x.com/takusea"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="x"
					>
						<IconBrandX />
					</a>
					<a
						href="https://bsky.app/profile/takusea.com"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="bluesky"
					>
						<IconBrandBluesky />
					</a>
					<a
						href="https://youtube.com/@takusea"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="youtube"
					>
						<IconBrandYoutube />
					</a>
					<a
						href="https://nicovideo.jp/user/131128563"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="niconico"
					>
						<IconDeviceTv />
					</a>
					<a
						href="https://github.com/takusea"
						class={`${styles.sns} u-url`}
						rel="me"
						data-link="github"
					>
						<IconBrandGithub />
					</a>
				</div>
			</div>
		</Card>
	);
};

export { ProfileCard };
