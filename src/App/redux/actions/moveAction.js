import * as types from "../types";

export const validateMove = () => (dispatch) => {
  dispatch({
    type: types.MOVE_CHECK,
  });
};

export const resetMove = () => (dispatch) => {
  dispatch({
    type: types.MOVE_RESET,
  });
};
