import { combineReducers } from "redux";
import WSReducer from "./WSReducer";
import moveReducer from "./moveReducer";
import piecesReducer from "./piecesReducer";
export default combineReducers({
  WS: WSReducer,
  move: moveReducer,
  pieces: piecesReducer,
});
