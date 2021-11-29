import * as types from "../types";

const defaultState = {
  currentPieces: null,
};

const piecesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.PIECES_UPDATE:
      return {
        ...state,
        currentPieces: action.payload,
      };
    case types.PIECES_RESET:
      return {
        ...state,
        currentPieces: null,
      };
    default:
      return state;
  }
};

export default piecesReducer;
