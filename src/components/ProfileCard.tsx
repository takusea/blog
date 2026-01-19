import { clientOnly } from "@solidjs/start";
import styles from "./ProfileCard.module.css";
import { Card } from "./base/Card";

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
			<div class={styles.inner}>
				<img src="/icon.png" alt="" class={styles.icon} />
				<p class={styles.name}>たくしい / Takusea</p>
				<p class={styles.description}>
					お絵描き・動画投稿・プログラミング・ゲームなどをするひとです。
				</p>
				<div class={styles.snslist}>
					<a href="https://takusea.com" class={styles.sns} data-link="profile">
						<IconUserCircle />
					</a>
					<a href="https://x.com/takusea" class={styles.sns} data-link="x">
						<IconBrandX />
					</a>
					<a
						href="https://bsky.app/profile/takusea.com"
						class={styles.sns}
						data-link="bluesky"
					>
						<IconBrandBluesky />
					</a>
					<a
						href="https://youtube.com/@takusea"
						class={styles.sns}
						data-link="youtube"
					>
						<IconBrandYoutube />
					</a>
					<a
						href="https://nicovideo.jp/user/131128563"
						class={styles.sns}
						data-link="niconico"
					>
						<IconDeviceTv />
					</a>
					<a
						href="https://github.com/takusea"
						class={styles.sns}
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
