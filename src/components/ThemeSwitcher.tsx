import styles from "./ThemeSwitcher.module.css";
import { Button } from "./base/Button";
import { clientOnly } from "@solidjs/start";
import useCookie from "~/hooks/useCookie";
import { Card } from "./base/Card";

const IconSun = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconSun,
	})),
);

const IconMoon = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconMoon,
	})),
);

const IconDevicesPc = clientOnly(() =>
	import("@tabler/icons-solidjs").then((m) => ({
		default: m.IconDevicesPc,
	})),
);

const ThemeSwitcher = () => {
	const [theme, setTheme] = useCookie("theme");

	return (
		<Card>
			<div class={styles.card} data-theme={theme()}>
				テーマ
				<div class={styles.list}>
					<Button
						variant={theme() === "light" ? "primary" : "default"}
						onClick={() => setTheme("light")}
					>
						<IconSun />
					</Button>
					<Button
						variant={theme() === "dark" ? "primary" : "default"}
						onClick={() => setTheme("dark")}
					>
						<IconMoon />
					</Button>
					<Button
						variant={
							theme() !== "light" && theme() !== "dark" ? "primary" : "default"
						}
						onClick={() => setTheme("device")}
					>
						<IconDevicesPc />
					</Button>
				</div>
			</div>
		</Card>
	);
};

export { ThemeSwitcher };
