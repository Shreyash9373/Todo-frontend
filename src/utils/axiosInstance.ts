import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://todo-backend-3im5.onrender.com/api/v1",
  baseURL:
    "http://todo-backend-env.eba-swkiy7ix.ap-south-1.elasticbeanstalk.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
