import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FONTS } from "../consts";
import {
  eyeOff,
  eyeOn,
  facebook,
  google,
  logo,
  mail,
  treasure,
} from "../icons";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Icon } from "../ui/Icon";
import { Input } from "../ui/Input";
import { Logo } from "../ui/Logo";
import { NavBar } from "../ui/NavBar";
import { PATHS } from "../consts/paths";
import { useLoginMutation } from "../react-query/hooks";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { getItem, setItem } from "../utils/storage";
import jwtDecode from "jwt-decode";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export function LoginPage() {
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const defaulTextColor = theme.text.default.color;
  const navigator = useNavigation();
  const setAuth = useSetAuth();
  const setId = useSetId();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "281768903486-036diacpu9ugmr7c1l12cp30rs51c2vm.apps.googleusercontent.com",
    iosClientId:
      "281768903486-3od8psbkj5b9g1er7f1fl5lojefevt06.apps.googleusercontent.com",
    expoClientId:
      "281768903486-obbl2fmgvq5t4snsjlu2pfoco95ss7g6.apps.googleusercontent.com",
  });

  const LoginMutation = useLoginMutation({
    onSuccess: async (res) => {
      setId(res.data.user.id);
      await setItem("access_token", res.data.token);
      await setItem("remember_me", checkboxVal ? "true" : "false");
      setAuth(true);
    },
    onError: (err) => {
      showAlert("Login Failed", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const login = () => {
    LoginMutation.mutate({
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    const checkRememberMe = async () => {
      const accessToken = await getItem("access_token");
      const rememberMe = await getItem("remember_me");

      if (
        rememberMe === "true" &&
        accessToken != null &&
        typeof accessToken === "string"
      ) {
        try {
          const { _id } = jwtDecode(accessToken) as { _id?: string };
          if (_id != null) {
            setAuth(true);
            setId(Number(_id));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkRememberMe();
  }, []);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (response?.type === "success" && response?.authentication !== null) {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      console.log("USER", user);
      console.log("Token", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.logoStyle}>
          <Logo />
        </View>
        <Text style={themedStyles.signInStyle}>Sign in</Text>
        <View
          style={{ width: "100%", paddingLeft: "20%", paddingRight: "20%" }}
        >
          <View
            style={{
              marginTop: "2.6%",
              width: "100%",
            }}
          >
            <Input
              size="large"
              title="Mail"
              xml={mail}
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>
          <View style={{ marginTop: "3%", width: "100%" }}>
            <Input
              size="large"
              title="Password"
              xml={passwordVisibility ? eyeOn : eyeOff}
              value={password}
              onChangeText={setPassword}
              isPassword={!passwordVisibility}
              onTouched={() => setPasswordVisibility(!passwordVisibility)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "3%",
            alignItems: "center",
            alignContent: "flex-start",
            marginLeft: "20%",
          }}
        >
          <Checkbox
            checked={checkboxVal}
            onPress={() => {
              setCheckboxVal(!checkboxVal);
            }}
          />
          <Text style={{ marginLeft: "1.2%", color: defaulTextColor }}>
            Remember me
          </Text>
        </View>
        <View
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
            marginTop: "2%",
            marginBottom: "1.8%",
          }}
        >
          <Button size="xlarge" onPress={login}>
            Sign in
          </Button>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <View style={{ marginBottom: "1.2%" }}>
            <Text style={{ fontSize: 14, color: defaulTextColor }}>
              Or sign in with
            </Text>
          </View>
          <View style={{ marginTop: "1.5%", width: "100%" }}>
            <Button
              size="large"
              xml={google}
              disabled={!request}
              onPress={() => {
                promptAsync({ useProxy: true });
              }}
            >
              Google
            </Button>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "6%",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: defaulTextColor }}>
              Don't have an account?{" "}
            </Text>
            <Text
              style={{
                color: colors.lightRoyalBlue,
                fontFamily: FONTS.PoppinsSemiBold,
              }}
              onPress={() => navigator.navigate(PATHS.REGISTER as never)}
            >
              Create Account
            </Text>
          </View>
          <Text
            style={{ color: colors.red, fontFamily: FONTS.PoppinsSemiBold }}
          >
            Forgot Password
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.appBackground.backgroundColor,
    },
    logoStyle: {
      marginTop: "5.83%",
      alignItems: "center",
    },
    signInStyle: {
      color: theme.text.default.color,
      fontSize: 24,
      fontFamily: FONTS.PoppinsSemiBold,
      marginTop: "6%",
      alignSelf: "center",
    },
    scrollViewStyle: {
      width: "100%",
      flex: 1,
    },
  });
};
