import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQxMjljMjZkZTVhMzk4NDVhY2I4MmQiLCJpYXQiOjE2MTQ5NDk0NzQsImV4cCI6MTYxNTU1NDI3NH0.GBxn3Ypm-85bCp3PIMf81atJytbOci7iSYUBHvfkdNk";

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
