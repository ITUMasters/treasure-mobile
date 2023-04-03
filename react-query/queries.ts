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
  return axios({ url: "/user/", method: "put", data });
};

export const apiGetAllTreasures = () => {
  return axios({ url: "/treasure/", method: "get" });
};

export const apiGetTreasureById = (treasureId: number) => {
  return axios({ url: "/treasure/" + treasureId.toString(), method: "get" });
};

export const apiGetTreasureByPageId = (pageId: number) => {
  return axios({ url: "/treasure/page/" + pageId.toString(), method: "get" });
};
