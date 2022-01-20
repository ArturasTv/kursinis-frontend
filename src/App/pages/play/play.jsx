import styles from "./play.module.scss";
import Game from "../../components/game/Game";

import { useSelector } from "react-redux";
import PlayerGameInfo from "../../components/playerGameInfo/playerGameInfo";
const Play = () => {
  const {
    searching,
    gameStarted,
    white,
    black,
    username,
    whiteTime,
    blackTime,
  } = useSelector((state) => state.WS);
  return (
    <div className={styles["play"]}>
      {searching && <div>Ieškomas priešininkas</div>}
      {gameStarted && (
        <>
          <PlayerGameInfo
            name={username !== white ? white : black}
            seconds={username !== white ? whiteTime : blackTime}
          />
          <Game />
          <PlayerGameInfo
            name={username === white ? white : black}
            seconds={username !== white ? whiteTime : blackTime}
          />
        </>
      )}
    </div>
  );
};

export default Play;
