import { useState, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { FONTS } from "../consts";
import { eyeOff, eyeOn, google, mail, userIcon } from "../icons";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";

import { Input } from "../ui/Input";
import { Logo } from "../ui/Logo";

import { useRegisterMutation } from "../react-query/hooks";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { isValidEmail } from "../utils/validators";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

export function RegisterPage() {
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const defaulTextColor = theme.text.default.color;
  const navigator = useNavigation();

  const RegisterMutation = useRegisterMutation({
    onSuccess: async (res) => {
      navigator.navigate(PATHS.LOGIN as never);
    },
    onError: (err) => {
      showAlert("Error happened", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const register = () => {
    RegisterMutation.mutate({
      username: username,
      email: email,
      photo_link: null,
      name: name,
      surname: surname,
      password: password1,
      coin: 0,
    });
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = !isValidEmail(email);
    const c2 = password1.trim() === "";
    const c3 = password1 !== password2;
    const c4 = name.trim() === "";
    const c5 = surname.trim() === "";
    const c6 = username.trim() === "";

    return c1 || c2 || c3 || c4 || c5 || c6;
  }, [email, password1, password2, surname, name, username]);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView
        style={themedStyles.scrollViewStyle}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={themedStyles.logoStyle}>
          <Logo />
        </View>
        <Text style={themedStyles.registerTitle}>Register</Text>
        <View style={themedStyles.inputContainer}>
          <Input
            size="medium"
            title="Name"
            xml={userIcon}
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
          />
          <View style={{ marginTop: "1.25%" }}>
            <Input
              size="medium"
              title="Surname"
              xml={userIcon}
              value={surname}
              onChangeText={(e) => setSurname(e)}
            />
          </View>
          <View style={{ marginTop: "1.25%" }}>
            <Input
              size="medium"
              title="Username"
              xml={userIcon}
              value={username}
              onChangeText={(e) => setUsername(e)}
            />
          </View>
          <View style={{ marginTop: "1.25%" }}>
            <Input
              size="medium"
              title="Mail"
              xml={mail}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={{ marginTop: "1.25%" }}>
            <Input
              size="medium"
              title="Password"
              xml={passwordVisibility1 ? eyeOn : eyeOff}
              onChangeText={setPassword1}
              value={password1}
              isPassword={!passwordVisibility1}
              onTouched={() => setPasswordVisibility1(!passwordVisibility1)}
            />
          </View>
          <View style={{ marginTop: "1.25%" }}>
            <Input
              size="medium"
              title="Confirm Password"
              xml={passwordVisibility2 ? eyeOn : eyeOff}
              onChangeText={setPassword2}
              value={password2}
              isPassword={!passwordVisibility2}
              onTouched={() => setPasswordVisibility2(!passwordVisibility2)}
            />
          </View>
          <View style={{ marginTop: "1.875%" }}>
            <Button
              size="xlarge"
              onPress={() => {
                register();
              }}
              disabled={isButtonDisabled}
            >
              Register
            </Button>
          </View>
        </View>
        <View style={{ marginTop: "3.125%" }}>
          <Text style={{ fontSize: 14, color: defaulTextColor }}>
            Or sign in with
          </Text>
        </View>
        <View style={themedStyles.inputContainer}>
          <View style={{ marginTop: "1.5%", width: "100%" }}>
            <Button size="large" xml={google}>
              Google
            </Button>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "4.48%",
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
              onPress={() => navigator.navigate(PATHS.LOGIN as never)}
            >
              Log In
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
    scrollViewStyle: {
      width: "100%",
      flex: 1,
    },
    registerTitle: {
      fontSize: 24,
      fontFamily: FONTS.PoppinsBold,
      marginTop: 2,
      color: theme.text.default.color,
    },
    inputContainer: {
      width: "100%",
      paddingLeft: "20%",
      paddingRight: "20%",
    },
  });
};
