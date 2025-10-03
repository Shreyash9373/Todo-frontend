import type { Task } from "../context/AuthContext";
import { axiosInstance } from "../utils/axiosInstance";

export const addTask = async (userData: Task) => {
  const res = await axiosInstance.post("/task/add-task", userData);
  return res.data;
};

export const updateTask = async (userData: Task) => {
  const res = await axiosInstance.put("/task/update-task", userData);
  return res.data;
};
export const deleteTask = async (id: number) => {
  const res = await axiosInstance.delete(`/task/delete-task/${id}`);
  return res.data;
};

export const getTasks = async () => {
  const res = await axiosInstance.get("/task/get-tasks");
  return res.data;
};

export const completTask = async (id: number, status: boolean) => {
  const res = await axiosInstance.patch(`/task/complete-task/${id}/${status}`);
  return res.data;
};
