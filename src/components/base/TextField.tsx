import { type ComponentProps, type JSX, Show } from "solid-js";
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
	const { start, end, ...inputProps } = props;

	return (
		<div class={styles.wrapper}>
			<Show when={start}>
				<div class={styles.start}>{start}</div>
			</Show>
			<input {...inputProps} class={styles.search} />
			<Show when={end}>
				<div class={styles.end}>{end}</div>
			</Show>
		</div>
	);
};

export { TextField };
