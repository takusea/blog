import type { ComponentProps } from "solid-js";
import styles from "./TextField.module.css";

const TextField = (props: ComponentProps<"input">) => {
	return <input {...props} class={styles.search} />;
};

export { TextField };
