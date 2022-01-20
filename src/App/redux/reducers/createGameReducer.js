import * as types from "../types";

const defaultState = {
  waitingOponent: false,
};

const createGameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CREATE_GAME:
      return {
        ...state,
        waitingOponent: true,
      };
    case types.DESTROY_GAME:
      return {
        ...state,
        waitingOponent: false,
      };
    default:
      return state;
  }
};

export default createGameReducer;
