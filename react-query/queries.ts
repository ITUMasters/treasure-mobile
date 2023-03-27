import { axios } from "../react-query";
import { User } from "./types";

export const apiRegister = (data: User) => {
  return axios({ url: "/user/register", method: "post", data });
};

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: "/user/login", method: "post", data });
};

export const apiGetAllQuizzes = () => {
  return axios({ url: "/quiz", method: "get" });
};
