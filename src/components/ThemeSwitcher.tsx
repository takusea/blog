import {
	IconBrightness,
	IconDevicesPc,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
import { Show } from "solid-js";
import useTheme from "~/hooks/useTheme";
import { Button } from "./base/Button";
import { Card } from "./base/Card";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme();

	return (
		<Card>
			<div class={styles.card}>
				<h2 class={styles.title}>
					<IconBrightness />
					テーマ
				</h2>
				<div class={styles.list}>
					<Show when={theme()}>
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
							variant={theme() === "device" ? "primary" : "default"}
							onClick={() => setTheme("device")}
						>
							<IconDevicesPc />
						</Button>
					</Show>
				</div>
			</div>
		</Card>
	);
};

export { ThemeSwitcher };
