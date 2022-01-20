import { combineReducers } from "redux";
import WSReducer from "./WSReducer";
import moveReducer from "./moveReducer";
import piecesReducer from "./piecesReducer";
import clockReducer from "./clockReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import createGameReducer from "./createGameReducer";
export default combineReducers({
  WS: WSReducer,
  move: moveReducer,
  pieces: piecesReducer,
  clock: clockReducer,
  auth: authReducer,
  message: messageReducer,
  createGame: createGameReducer,
});
