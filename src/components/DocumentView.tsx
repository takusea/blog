import styles from "./DocumentView.module.css";

type Props = {
	document: string;
};

const DocumentView = (props: Props) => {
	return <div class={styles.document} innerHTML={props.document} />;
};

export { DocumentView };
