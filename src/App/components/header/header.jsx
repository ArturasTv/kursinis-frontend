import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import { formatTitle } from "../../utills";
import styles from "./header.module.scss";
import Navbar from "../navbar/navbar";
const Header = () => {
  const currentLocation = useLocation();
  return (
    <header className={styles["header"]}>
      <Helmet>
        <title>{formatTitle(currentLocation.pathname)}</title>
      </Helmet>
      <Navbar />
    </header>
  );
};

export default Header;
