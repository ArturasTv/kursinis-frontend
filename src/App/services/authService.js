import axiosInstance from "../api/config/axiosInstance";
import TokenService from "./tokenService";

const login = (username, password) => {
  return axiosInstance
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};
const logout = () => {
  TokenService.removeUser();
};
export default {
  login,
  logout,
};
