import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "./storage";

export type AuthVerifyType = {
  logout: () => void;
};
export const AuthVerify = ({ logout }: AuthVerifyType) => {
  let navigator = useNavigation();
  useEffect(() => {
    const jwtExpirationHandling = async () => {
      const accessToken = await getItem("access_token");
      if (accessToken !== null && typeof accessToken === "string") {
        try {
          const decodedToken = jwtDecode(accessToken);
          const { exp } = decodedToken as { exp?: string };
          const expirationTime = parseInt(exp as string);
          if (expirationTime * 1000 < Date.now()) {
            logout();
          }
        } catch (err) {
          console.error(err);
          logout();
        }
      }
    };
    jwtExpirationHandling();
  }, [navigator, logout]);

  return <></>;
};
