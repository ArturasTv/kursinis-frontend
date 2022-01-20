import * as types from "../types";

export const validateMove = (turn) => (dispatch) => {
  dispatch({
    type: types.MOVE_CHECK,
  });
  dispatch({
    type: types.CLOCK_UPDATE,
    payload: turn,
  });
};

export const resetMove = () => (dispatch) => {
  dispatch({
    type: types.MOVE_RESET,
  });
};
