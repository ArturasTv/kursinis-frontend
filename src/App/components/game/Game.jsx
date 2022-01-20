import React from "react";
import DraughtsBoard from "../draughtsBoard/DraughtsBoard";

import { useSelector, useDispatch } from "react-redux";
import { makeMove } from "../../redux/actions/WSAction";
import TokenService from "../../services/tokenService";
import Clock from "../clock/clock";

const Game = () => {
  const dispatch = useDispatch();
  const { moveDone } = useSelector((state) => state.move);
  const { white, black, key, start, gameId } = useSelector((state) => state.WS);

  const { pieces } = useSelector((state) => state.WS);

  const { currentPieces } = useSelector((state) => state.pieces);

  const username = TokenService.getUser().name;

  const getTurn = (username, white, black) => {
    if (username === white) return "WHITE";
    if (username === black) return "BLACK";
  };

  const getOppositeTurn = (turn) => {
    if (turn === "BLACK") return "WHITE";
    if (turn === "WHITE") return "BLACK";
  };
  let turn = getTurn(username, white, black);
  if (moveDone) {
    dispatch(makeMove({ turn, currentPieces, gameId }));
  }

  return (
    <DraughtsBoard
      startingPosition={[...pieces]}
      key={key}
      turn={start ? turn : null}
      orentation={turn}
    />
  );
};

export default Game;
