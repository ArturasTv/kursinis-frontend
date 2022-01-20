import Header from "../components/header/header";
import styles from "./layout.module.scss";
import MessageBox from "../components/message/messageBox";
import { useSelector } from "react-redux";
import Checker from "../components/checker/checker";
const Layout = ({ children }) => {
  const { message } = useSelector((state) => state.message);
  return (
    <div>
      <Checker />
      <Header />
      {message && <MessageBox message={message} />}
      <main className={styles["main"]}>{children}</main>
    </div>
  );
};

export default Layout;
