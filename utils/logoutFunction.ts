import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { removeItem } from "./storage";

export const logoutFunction = async () => {
  const setId = useSetId();
  const setAuth = useSetAuth();
  setId(0);
  setAuth(false);
  await removeItem("access_token");
  await removeItem("remember_me");
};
