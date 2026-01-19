import type { ComponentProps } from "solid-js";
import styles from "./Card.module.css";

const Card = (props: Omit<ComponentProps<"div">, "class">) => {
	return <div class={styles.card} {...props}></div>;
};

export { Card };
