import axiosInstance from "../api/config/axiosInstance";

const Api = {
  startGame: (username) => {
    return axiosInstance({
      method: "post",
      url: "/start",
      data: {
        username,
      },
    });
  },
};

export default Api;
