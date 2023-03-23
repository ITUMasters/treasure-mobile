import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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

export function RegisterPage() {
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const defaulTextColor = theme.text.default.color;

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
          <Input size="medium" title="Name" xml={mail} />
          <View style={{ marginTop: "1.25%" }}>
            <Input size="medium" title="Surname" xml={mail} />
          </View>
          <View style={{ marginTop: "1.25%" }}>
            <Input size="medium" title="Mail" xml={mail} />
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
            <Button size="xlarge">Register</Button>
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
