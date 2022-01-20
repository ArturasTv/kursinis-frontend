import * as types from "../types";

const defaultState = {
  username: "",
  white: "",
  black: "",
  gameId: "",
  key: "",
  pieces: null,
  gameStarted: false,
  searching: false,
  start: null,
  startedGame: null,
  clockTicking: null,
  whiteTime: null,
  blackTime: null,
  tables: null,
  gameId: null,
};

const WSReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.WS_MSG_RECEIVED:
      return { ...state, ...action.payload };
    case types.MK_MOVE:
      return { ...state, history: action.payload };
    case types.CH_NAME:
      return { ...state, username: action.payload };
    case types.START_GAME_PENDING:
      return { ...state, searching: true };
    case types.START_GAME_FULFILLED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default WSReducer;
