import type { ComponentProps } from "solid-js";
import styles from "./Button.module.css";

type Props = {
	variant?: "default" | "primary";
} & Omit<ComponentProps<"button">, "class">;

const Button = (props: Props) => {
	return (
		<button
			type="button"
			class={styles.button}
			data-variant={props.variant ?? "default"}
			{...props}
		>
			{props.children}
		</button>
	);
};

export { Button };
