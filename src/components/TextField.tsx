import { Show, type ComponentProps, type JSX } from "solid-js";
import styles from "./TextField.module.css";

type Props = ComponentProps<"input"> & {
	start?: JSX.Element;
	end?: JSX.Element;
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
