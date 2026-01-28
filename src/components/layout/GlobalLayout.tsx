import type { JSX } from "solid-js";
import styles from "./GlobalLayout.module.css";

type Props = {
	header: JSX.Element;
	sideTop: JSX.Element;
	sideBottom: JSX.Element;
	children: JSX.Element;
};

const GlobalLayout = (props: Props) => {
	return (
		<div class={styles.wrapper}>
			<div class={styles.grid}>
				<header class={styles.header}>{props.header}</header>
				<aside class={styles.side}>
					{props.sideTop}
					<div class={styles.bottom}>{props.sideBottom}</div>
				</aside>
				<main class={styles.main}>{props.children}</main>
				<div class={styles.mobile}>{props.sideBottom}</div>
			</div>
			<footer class={styles.footer}>©2026 takusea</footer>
		</div>
	);
};

export { GlobalLayout };
