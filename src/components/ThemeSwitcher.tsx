import {
	IconBrightness,
	IconDevicesPc,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
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
					<Button
						variant={theme() === "light" ? "primary" : "default"}
						onClick={() => setTheme("light")}
						disabled={theme() ? undefined : true}
					>
						<IconSun />
					</Button>
					<Button
						variant={theme() === "dark" ? "primary" : "default"}
						onClick={() => setTheme("dark")}
						disabled={theme() ? undefined : true}
					>
						<IconMoon />
					</Button>
					<Button
						variant={theme() === "device" ? "primary" : "default"}
						onClick={() => setTheme("device")}
						disabled={theme() ? undefined : true}
					>
						<IconDevicesPc />
					</Button>
				</div>
			</div>
		</Card>
	);
};

export { ThemeSwitcher };
