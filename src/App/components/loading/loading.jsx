import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles["lds-spinner"]}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
