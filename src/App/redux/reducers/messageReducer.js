import * as types from "../types";

const initialState = {};

const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_MESSAGE:
      return { message: payload };
    case types.CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
};

export default messageReducer;
