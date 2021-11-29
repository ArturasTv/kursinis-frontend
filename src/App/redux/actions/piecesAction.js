import * as types from "../types";

export const updatePieces = (currentPieces) => (dispatch) => {
  dispatch({
    type: types.PIECES_UPDATE,
    payload: currentPieces,
  });
};

export const resetPieces = () => (dispatch) => {
  dispatch({
    type: types.PIECES_RESET,
  });
};
