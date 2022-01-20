import axiosInstance from "../api/config/axiosInstance";

const getStats = () => {
  return axiosInstance({
    method: "get",
    url: "/stats",
  }).then((response) => {
    return response.data;
  });
};

export default getStats;
