import styles from "./createGameForm.module.scss";
import { useState } from "react";
import { minutes, plus } from "../../constants";
import { createGame } from "../../redux/actions/WSAction";
import { useDispatch } from "react-redux";

const CreateGame = () => {
  const dispatch = useDispatch();

  const [min, setMin] = useState("");
  const [plu, setPlu] = useState("");

  const [minError, setMinError] = useState(null);
  const [pluError, setPluError] = useState(null);

  const validateForm = (type) => {
    if (type == "min") {
      setMinError(null);
    }
    if (type == "plu") {
      setPluError(null);
    }
    if (type) return;

    if (min == "") {
      setMinError("Nepasirinktas laikas");
    } else {
      setMinError(null);
    }
    if (plu == "") {
      setPluError("Nepasirinktas laikas");
    } else {
      setPluError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (minError || pluError) return;
    if (!min || !plu) return;

    dispatch(createGame({ minutes: min, plus: plu }));
  };
  return (
    <div className={styles["createGame-form-wrapper"]}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles["createGame-form"]}
      >
        <select
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
            validateForm("min");
          }}
        >
          <option value="" disabled selected>
            Minutės
          </option>
          {minutes.map((minute) => (
            <option value={minute}>{minute}</option>
          ))}
        </select>
        <span className={styles["error-message"]}>{minError && minError}</span>
        <select
          value={plu}
          onChange={(e) => {
            setPlu(e.target.value);
            validateForm("plu");
          }}
        >
          <option value="" disabled selected>
            Pliusas
          </option>
          {plus.map((plus) => (
            <option value={plus}>{plus}</option>
          ))}
        </select>

        <span className={styles["error-message"]}>{pluError && pluError}</span>
        <button className={styles["button"]}>Sukurti stalą</button>
      </form>
    </div>
  );
};

export default CreateGame;
