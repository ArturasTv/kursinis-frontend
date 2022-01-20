import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { menuItems } from "../../constants";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useState } from "react";
const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showMenu, setShowMenu] = useState(true);

  const onMouseMenu = () => {
    setShowMenu(false);
  };
  const onMouseLeaveNav = () => {
    setShowMenu(true);
  };

  return (
    <div
      className={styles["nav"]}
      onMouseLeave={onMouseLeaveNav}
      onMouseEnter={onMouseMenu}
    >
      <nav id="nav">
        {menuItems.map((item, i) =>
          item.visible ? (
            <Link
              key={item.key}
              to={item.path}
              className={
                item.path === location.pathname ? styles["active"] : null
              }
            >
              {item.title}
            </Link>
          ) : item.protected === !isLoggedIn ? (
            <Link
              key={item.key}
              to={item.path}
              className={
                item.path === location.pathname ? styles["active"] : null
              }
            >
              {item.title}
            </Link>
          ) : item.private === isLoggedIn ? (
            <Link
              key={item.key}
              to={item.path}
              className={
                item.path === location.pathname ? styles["active"] : null
              }
            >
              {item.title}
            </Link>
          ) : null
        )}
        <div
          id="meniu-button"
          onMouseEnter={onMouseMenu}
          className={`${styles["meniu-button"]} ${
            showMenu
              ? styles["meniu-button-apear"]
              : styles["meniu-button-disapear"]
          }`}
        >
          Meniu
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
