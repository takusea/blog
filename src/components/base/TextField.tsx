import { type Component, type ComponentProps, splitProps } from "solid-js";
import styles from "./TextField.module.css";

type Props = ComponentProps<"input"> & {
	start?: Component;
	end?: Component;
	type?:
		| "date"
		| "datetime-local"
		| "month"
		| "time"
		| "week"
		| "email"
		| "number"
		| "password"
		| "search"
		| "tel"
		| "text"
		| "url";
};

const TextField = (props: Props) => {
	const [fieldProps, inputProps] = splitProps(props, ["start", "end"]);

	return (
		<div class={styles.wrapper}>
			{fieldProps.start && (
				<div class={styles.start}>
					<fieldProps.start />
				</div>
			)}

			<input {...inputProps} class={styles.search} />

			{fieldProps.end && (
				<div class={styles.end}>
					<fieldProps.end />
				</div>
			)}
		</div>
	);
};

export { TextField };
