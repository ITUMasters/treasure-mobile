import { axios } from "../react-query";
import { User } from "./types";

export const apiRegister = (data: User) => {
  return axios({ url: "/user/register", method: "post", data });
};

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: "/user/login", method: "post", data });
};

export const apiGetUser = (userId: number) => {
  return axios({ url: "/user/" + userId.toString(), method: "get" });
};

export const apiChangeAccountInfo = (data: {
  name: string;
  surname: string;
  username: string;
  id: number;
}) => {
  console.log(data);
  return axios({ url: "/user/" + data.id.toString(), method: "put", data });
};

export const apiGetAllQuizzes = () => {
  return axios({ url: "/quiz", method: "get" });
};
