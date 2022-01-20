import Api from "../../services/startGame";
import * as types from "../types";

let webSocket;

export const initWebSocket = (dispatch, username) => {
  webSocket = new WebSocket(`ws://localhost:3333/?username=${username}`);
  webSocket.onmessage = (event) =>
    dispatch({ type: types.WS_MSG_RECEIVED, payload: JSON.parse(event.data) });
};

export const makeMove = (data) => (dispatch) => {
  if (
    webSocket.readyState === WebSocket.CLOSED ||
    webSocket.readyState === WebSocket.CLOSING
  ) {
    dispatch({
      type: types.SET_MESSAGE,
      payload: "Nutrūko ryšys su serveriu.",
    });
  }

  webSocket.send(JSON.stringify({ type: "MAKE_MOVE", data }));
  dispatch({ type: types.MK_MOVE });
  dispatch({ type: types.MOVE_RESET });
};

/*export const dispatchStartGame = (username) => (dispatch) => {
  dispatch({ type: types.START_GAME_PENDING });
  return Api.startGame(username).then(
    (res) => {
      dispatch({ type: types.START_GAME_FULFILLED, payload: res.data });
      // initWebSocket(dispatch);
    },
    (err) => {
      dispatch({ type: types.START_GAME_FAILED, err });
    }
  );
};*/

export const dispatchStartGame = (data) => (dispatch) => {
  dispatch({ type: types.START_GAME_PENDING });
  dispatch({ type: types.DESTROY_GAME });
  webSocket.send(JSON.stringify({ type: "START_GAME", data }));
};

export const createGame = (data) => (dispatch) => {
  dispatch({ type: types.CREATE_GAME });
  webSocket.send(JSON.stringify({ type: "CREATE_GAME", data }));
};

export const dispatchStartWebSocket = (username) => (dispatch) => {
  initWebSocket(dispatch, username);
};
