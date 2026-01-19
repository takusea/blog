import styles from "./DocumentView.module.css";
import "./RemarkLinkCardPlus.css";

type Props = {
	document: string;
};

const DocumentView = (props: Props) => {
	return (
		<article
			class={styles.document}
			innerHTML={props.document}
			data-pagefind-body
		/>
	);
};

export { DocumentView };
