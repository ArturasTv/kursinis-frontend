import styles from "./registerForm.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);

  const validateForm = (type) => {
    if (type === "user") {
      setUsernameError(null);
    }
    if (type === "pass") {
      setPasswordError(null);
    }
    if (type === "pass2") {
      setPassword2Error(null);
    }
    if (type === "email") {
      setEmailError(null);
    }
    if (type) return;

    if (username === "") {
      setUsernameError("Neįvestas vartotojo vardas");
    } else {
      setUsernameError(null);
    }

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") {
      setEmailError("Neįvestas El. paštas");
    } else if (!email.match(mailformat)) {
      setEmailError("Netinkamas El. pašto formatas");
    } else {
      setEmailError(null);
    }

    if (password === "") {
      setPasswordError("Neįvestas slaptažodis");
    } else {
      setPasswordError(null);
    }
    if (password2 === "") {
      setPassword2Error("Neįvestas slaptažodis");
    } else {
      setPassword2Error(null);
    }

    if (password !== password2) {
      if (!passwordError && !password2Error) {
        setPasswordError("Slaptažodžiai nesutampa");
        setPassword2Error("Slaptažodžiai nesutampa");
      }
    }

    return !(usernameError || passwordError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) return;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value !== "") validateForm("user");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== "") validateForm("email");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== "") validateForm("pass");
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    if (e.target.value !== "") validateForm("pass2");
  };

  return (
    <div className={styles["register-form-wrapper"]}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles["register-form"]}
      >
        <input
          type="text"
          placeholder="Vartotojo vardas"
          onChange={(e) => handleUsernameChange(e)}
          value={username}
          className={usernameError && styles["input-error"]}
        />
        <span className={styles["error-message"]}>
          {usernameError && usernameError}
        </span>
        <input
          type="text"
          placeholder="Elektroninis paštas"
          onChange={(e) => handleEmailChange(e)}
          value={email}
          className={emailError && styles["input-error"]}
        />
        <span className={styles["error-message"]}>
          {emailError && emailError}
        </span>
        <input
          type="password"
          placeholder="Slaptažodis"
          onChange={(e) => handlePasswordChange(e)}
          value={password}
          className={passwordError && styles["input-error"]}
        />
        <span className={styles["error-message"]}>
          {passwordError && passwordError}
        </span>
        <input
          type="password"
          placeholder="Pakartokite slaptažodį"
          onChange={(e) => handlePassword2Change(e)}
          value={password2}
          className={password2Error && styles["input-error"]}
        />
        <span className={styles["error-message"]}>
          {password2Error && password2Error}
        </span>
        <button className={styles["button"]}>Registruotis</button>
      </form>
    </div>
  );
};

export default RegisterForm;
