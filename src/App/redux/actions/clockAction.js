import * as types from "../types";

export const updateClockTurn = (turn) => (dispatch) => {
  dispatch({
    type: types.CLOCK_UPDATE,
    payload: turn,
  });
};

export const updateWhiteClock = () => (dispatch) => {
  dispatch({
    type: types.UPDATE_WHITE_TIME,
  });
};
export const updateBlackClock = () => (dispatch) => {
  dispatch({
    type: types.UPDATE_BLACK_TIME,
  });
};
