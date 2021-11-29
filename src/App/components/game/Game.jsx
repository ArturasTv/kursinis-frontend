import React from "react";
import DraughtsBoard from "../draughtsBoard/DraughtsBoard";

import { useSelector, useDispatch } from "react-redux";
import { makeMove } from "../../redux/actions/WSAction";

const Game = () => {
  const dispatch = useDispatch();
  const { moveDone } = useSelector((state) => state.move);
  const { white, black, username, gameStarted, searching, key, start } =
    useSelector((state) => state.WS);

  const { pieces } = useSelector((state) => state.WS);

  const { currentPieces } = useSelector((state) => state.pieces);

  const getTurn = (username, white, black) => {
    if (username === white) return "WHITE";
    if (username === black) return "BLACK";
  };
  let turn = getTurn(username, white, black);
  if (moveDone) {
    dispatch(makeMove(turn, currentPieces));
  }
  return (
    <div>
      {searching && <div>Ieškomas priešininkas</div>}
      {gameStarted && (
        <>
          <DraughtsBoard
            startingPosition={[...pieces]}
            key={key}
            turn={start ? turn : null}
            orentation={turn}
          />
        </>
      )}
    </div>
  );
};

export default Game;
