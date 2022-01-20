import styles from "./messageBox.module.scss";

import { useDispatch } from "react-redux";
import { clearMessage } from "../../redux/actions/messageAction";
const MessageBox = ({ message }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearMessage());
  };
  return (
    <div className={styles["message-box"]}>
      <div className={styles["close-button"]} onClick={handleClick} />
      <div className={styles["message"]}>{message}</div>
    </div>
  );
};

export default MessageBox;
