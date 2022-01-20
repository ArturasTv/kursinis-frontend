import * as types from "../types";
import authService from "../../services/authService";

export const login = (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    (data) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      dispatch({
        type: types.LOGIN_FAIL,
      });

      dispatch({
        type: types.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: types.LOGOUT,
  });
};

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: types.REFRESH_TOKEN,
    payload: accessToken,
  });
};
