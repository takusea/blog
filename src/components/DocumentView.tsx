import styles from "./DocumentView.module.css";
import "./RemarkLinkCardPlus.css";
import "./RehypePrettyCode.css";
import type { JSX } from "astro/jsx-runtime";

type Props = {
	children: JSX.Element;
};

const DocumentView = (props: Props) => {
	return (
		<article
			class={styles.document}
			innerHTML={props.children}
			data-pagefind-body
		/>
	);
};

export { DocumentView };
