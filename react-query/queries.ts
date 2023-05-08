import { axios } from "../react-query";
import { TreasureSubmission, User } from "./types";

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
  name?: string;
  surname?: string;
  username?: string;
  photo_link?: string;
  id?: number;
}) => {
  return axios({ url: "/user/", method: "put", data });
};

export const apiGetAllTreasures = () => {
  return axios({ url: "/treasure/", method: "get" });
};

export const apiGetTreasureById = (treasureId: number) => {
  return axios({ url: "/treasure/" + treasureId.toString(), method: "get" });
};

export const apiGetHintsByTreasureId = (treasureId: number) => {
  return axios({
    url: "/hint/treasure/" + treasureId.toString(),
    method: "get",
  });
};

export const apiGetTreasureByPageId = (
  pageId: number,
  regionId: number | null
) => {
  return axios({
    url: "/treasure/page/" + pageId.toString(),
    method: "get",
    params: { regionId: regionId },
  });
};

export const apiPurchaseHint = (data: { hintId: number }) => {
  return axios({
    url: "/hint/" + data.hintId.toString() + "/purchase",
    method: "post",
  });
};

export const apiJoin = (data: { treasureId: number }) => {
  return axios({
    url: "/treasure/" + data.treasureId.toString() + "/join",
    method: "post",
  });
};

export const apiTreasureSubmission = (data: TreasureSubmission) => {
  return axios({
    url: "/treasureSubmission",
    method: "post",
    data,
  });
};

export const apiGetTreasureSubmissionByInteractionId = (
  interactionId: number
) => {
  return axios({
    url: "/treasureSubmission",
    method: "get",
    params: { interactionId: interactionId },
  });
};

export const apiUploadImage = (formData: FormData) => {
  return axios({
    url: "/image/upload",
    data: formData,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data, application/json, */*",
    },
  });
};

export const apiGetCompletedTreasures = () => {
  return axios({
    url: "/treasure/completed",
    method: "get",
  });
};

export const apiGetLeaderboardByTreasureId = (treasureId: number) => {
  return axios({
    url: "/treasure/" + treasureId.toString() + "/leaderboard",
    method: "get",
  });
};

export const apiDownloadImage = (imageName: string) => {
  return axios({
    url: "/image/download/" + imageName,
    method: "get",
    responseType: "blob",
  });
};

export const apiGetWeeklyChallenge = () => {
  return axios({
    url: "/challenge/weekly",
    method: "get",
  });
};

export const apiJoinToChallenge = (data: { challengeId: number }) => {
  return axios({
    url: "/challenge/" + data.challengeId.toString() + "/join",
    method: "post",
  });
};
