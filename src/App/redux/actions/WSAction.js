import Api from "../../services";
import * as types from "../types";

let webSocket;

export const initWebSocket = (dispatch, id) => {
  webSocket = new WebSocket(`ws://localhost:3333/ws?id=${id}`);
  webSocket.onmessage = (event) =>
    dispatch({ type: types.WS_MSG_RECEIVED, payload: JSON.parse(event.data) });
};

export const makeMove = (turn, pieces) => (dispatch) => {
  webSocket.send(JSON.stringify({ turn: turn, pieces: pieces }));
  dispatch({ type: types.MK_MOVE });
  dispatch({ type: types.MOVE_RESET });
};

export const changeName = (name) => ({
  type: types.CH_NAME,
  payload: name,
});

export const dispatchStartGame = (username) => (dispatch) => {
  dispatch({ type: types.START_GAME_PENDING });
  return Api.startGame(username).then(
    (res) => {
      dispatch({ type: types.START_GAME_FULFILLED, payload: res.data });
      initWebSocket(dispatch, res.data.gameId);
    },
    (err) => {
      dispatch({ type: types.START_GAME_FAILED, err });
    }
  );
};
