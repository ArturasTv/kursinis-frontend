import styles from "./App.module.scss";
import Game from "./components/game/Game";
import { dispatchStartGame } from "./redux/actions/WSAction";
import { useState } from "react";
import { useDispatch } from "react-redux";

function App() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const changeHandle = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(dispatchStartGame(username));
  };

  return (
    <div className={styles["app"]}>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={changeHandle} value={username} />
        <button>Pradėti</button>
      </form>
      <Game />
    </div>
  );
}

export default App;
