import { type ComponentProps, type JSX, Show, splitProps } from "solid-js";
import styles from "./TextField.module.css";

type Props = ComponentProps<"input"> & {
	start?: JSX.Element;
	end?: JSX.Element;
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
			<Show when={fieldProps.start}>
				<div class={styles.start}>{fieldProps.start}</div>
			</Show>
			<input {...inputProps} class={styles.search} />
			<Show when={fieldProps.end}>
				<div class={styles.end}>{fieldProps.end}</div>
			</Show>
		</div>
	);
};

export { TextField };
