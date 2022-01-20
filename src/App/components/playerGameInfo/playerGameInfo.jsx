import styles from "./playerGameInfo.module.scss";
import { secondsToTime } from "../../functions";
const PlayerGameInfo = ({ name, seconds }) => {
  return (
    <div className={styles["playerGameInfo"]}>
      <div className={styles["name"]}>{name}</div>
      <div className={styles["time"]}>
        <code>{secondsToTime(seconds)}</code>
      </div>
    </div>
  );
};

export default PlayerGameInfo;
