import { useCallback, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigationState } from "@react-navigation/native";
import { getItem, removeItem } from "./storage";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";

export const AuthVerify = () => {
  const setId = useSetId();
  const setAuth = useSetAuth();
  const state = useNavigationState((state) => state);
  useEffect(() => {
    const jwtExpirationHandling = async () => {
      const accessToken = await getItem("access_token");
      if (accessToken !== null && typeof accessToken === "string") {
        try {
          const decodedToken = jwtDecode(accessToken);
          const { exp } = decodedToken as { exp?: string };
          const expirationTime = parseInt(exp as string);
          console.log(expirationTime - Date.now() / 1000);
          if (expirationTime < Date.now() / 1000) {
            console.log("Girdi mu?");
            setId(0);
            setAuth(false);
            await removeItem("access_token");
            await removeItem("remember_me");
          }
        } catch (err) {
          console.log("Debugla");
          console.error(err);
          setId(0);
          setAuth(false);
          await removeItem("access_token");
          await removeItem("remember_me");
        }
      }
    };
    jwtExpirationHandling();
  }, [state]);

  return <></>;
};
