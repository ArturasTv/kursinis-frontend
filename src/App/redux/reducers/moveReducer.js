import * as types from "../types";

const defaultState = {
  moveDone: false,
};

const moveReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.MOVE_CHECK:
      return {
        ...state,
        moveDone: true,
      };
    case types.MOVE_RESET:
      return {
        ...state,
        moveDone: false,
      };
    default:
      return state;
  }
};

export default moveReducer;
