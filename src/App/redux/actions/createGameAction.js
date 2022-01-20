import * as types from "../types";

export const createGame = () => (dispatch) => {
  dispatch({
    type: types.CREATE_GAME,
  });
};

export const destroyGame = () => (dispatch) => {
  dispatch({
    type: types.DESTROY_GAME,
  });
};
