import {
	IconDevicesPc,
	IconMoon,
	IconSun,
} from "@tabler/icons-solidjs";
import useCookie from "~/hooks/useCookie";
import { Button } from "./base/Button";
import { Card } from "./base/Card";
import styles from "./ThemeSwitcher.module.css";

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
