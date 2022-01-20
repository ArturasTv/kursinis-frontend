import styles from "./waitingOponent.module.scss";
import Loading from "../loading/loading";
const WaitingOponent = () => {
  return (
    <div className={styles["waiting-box"]}>
      <div>
        <Loading />
        <div className={styles["text"]}>Laukiama priešininko</div>
      </div>
    </div>
  );
};

export default WaitingOponent;
