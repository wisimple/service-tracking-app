import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const token = localStorage.getItem("token") || undefined;
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

api.interceptors.response.use(
  (res) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(res);
        }, 300);
      });
    } else {
      return res;
    }
  },
  (err) => {
    console.log("error occured");
    throw err;
  }
);

export default api;
