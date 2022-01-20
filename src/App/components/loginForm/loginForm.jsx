import styles from "./loginForm.module.scss";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { dispatchStartWebSocket } from "../../redux/actions/WSAction";
import TokenService from "../../services/tokenService";

import Loading from "../loading/loading";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameActive, setUsernameActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validateForm = (type) => {
    if (type == "user") {
      setUsernameError(null);
    }
    if (type == "pass") {
      setPasswordError(null);
    }
    if (type) return;

    if (username == "") {
      setUsernameError("Neįvestas vartotojo vardas");
    } else {
      setUsernameError(null);
    }
    if (password == "") {
      setPasswordError("Neįvestas slaptažodis");
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (usernameError || passwordError) return;
    if (!username || !password) return;

    setLoading(true);
    dispatch(login(username, password))
      .then(() => {
        dispatch(dispatchStartWebSocket(TokenService.getUser().name));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value != "") validateForm("user");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value != "") validateForm("pass");
  };

  if (isLoggedIn) {
    return <Navigate to="/vienas" />;
  }

  return !loading ? (
    <div className={styles["login-form-wrapper"]}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles["login-form"]}>
        <input
          type="text"
          id="usernameInput"
          placeholder="Vartotojo vardas"
          onChange={(e) => handleUsernameChange(e)}
          value={username}
          className={usernameError && styles["input-error"]}
          onClick={() => {
            setUsernameActive(true);
          }}
        />
        <span className={styles["error-message"]}>
          {usernameError && usernameError}
        </span>
        <input
          type="password"
          id="passwordInput"
          placeholder="Slaptažodis"
          onChange={(e) => handlePasswordChange(e)}
          value={password}
          className={passwordError && styles["input-error"]}
          onClick={() => {
            setPasswordActive(true);
          }}
        />
        <span className={styles["error-message"]}>
          {passwordError && passwordError}
        </span>
        <button className={styles["button"]}>Prisijungti</button>
        <Link to="/remind" className={styles["forgot-password-link"]}>
          Pamiršote slaptažodį?
        </Link>
        <hr className={styles["line"]} />
        <Link to="/register" className={styles["button"]}>
          Kurti naują paskyrą
        </Link>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

export default LoginForm;
