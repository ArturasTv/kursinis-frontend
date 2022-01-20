import * as types from "../types";

const defaultState = {
  whiteTime: null,
  blackTime: null,
  clockTurn: "WHITE",
};

const clockReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CLOCK_UPDATE:
      return {
        ...state,
        clockTurn: action.payload,
      };
    case types.SET_CLOCKS:
      return {
        ...state,
        whiteTime: action.payload.whiteT,
        blackTime: action.payload.blackT,
      };
    case types.UPDATE_WHITE_TIME:
      return {
        ...state,
        whiteTime: state.whiteTime - 1,
      };
    case types.UPDATE_BLACK_TIME:
      return {
        ...state,
        blackTime: state.blackTime - 1,
      };
    default:
      return state;
  }
};

export default clockReducer;
