import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQxMjljMjZkZTVhMzk4NDVhY2I4MmQiLCJpYXQiOjE2MTQ5NDk0NzQsImV4cCI6MTYxNTU1NDI3NH0.GBxn3Ypm-85bCp3PIMf81atJytbOci7iSYUBHvfkdNk";

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
