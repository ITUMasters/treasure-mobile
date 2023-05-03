import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { NavBar } from "../ui/NavBar";
import { addFriend } from "../icons/index";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../theme/colors";
import { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";
import { useJoinMutation, useTreasureById } from "../react-query/hooks";
import { Loading } from "./Loading";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { removeItem } from "../utils/storage";
import { AxiosError } from "axios";

export function JoinPage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation();
  const [pin, setPin] = useState("");
  const [placeholderColor, setPlaceholderColor] = useState(
    theme.pin.placeholderColor
  );
  const [curPlaceholder, setCurPlaceholder] = useState("PIN");

  const setId = useSetId();
  const setAuth = useSetAuth();
  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem("access_token");
    await removeItem("remember_me");
  };

  const JoinMutation = useJoinMutation({
    onSuccess: async (res) => {
      navigator.navigate(
        PATHS.PLAY as never,
        {
          treasureId: res.data.treasureId,
          interactionId: res.data.id,
        } as never
      );
    },
    onError: (err) => {
      const errFormated = err as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      showAlert("Join Error", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const join = (treasureId: number) => {
    JoinMutation.mutate({
      treasureId: treasureId,
    });
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = pin.trim() === "";
    const c2 = !Number.isInteger(parseInt(pin));
    return c1 || c2;
  }, [pin]);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={{ width: "100%", marginTop: 260 }}>
          <View style={{ marginTop: "2%", alignItems: "center" }}>
            <TextInput
              style={{
                fontSize: 50,
                textAlign: "center",
                color: colors.lightRoyalBlue,
              }}
              keyboardType="number-pad"
              placeholder={curPlaceholder}
              placeholderTextColor={placeholderColor}
              onChangeText={(e) => {
                setPin(e);
              }}
              value={pin.toString()}
              onFocus={() => {
                setPlaceholderColor(theme.appBackground.backgroundColor);
                setCurPlaceholder("");
              }}
              onEndEditing={() => {
                setPlaceholderColor(theme.pin.placeholderColor);
                setCurPlaceholder("PIN");
              }}
            />
            <View style={{ width: "80%", alignSelf: "center" }}>
              <View style={{ marginTop: "10%" }}>
                <Button
                  size="xlarge"
                  color="default"
                  onPress={() => join(parseInt(pin))}
                  disabled={isButtonDisabled}
                >
                  JOIN
                </Button>
              </View>
              <Button size="small" onPress={logout}>
                Logout
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar pageNo="2" />
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
    scrollViewStyle: {
      width: "100%",
      flex: 1,
    },
    darkMode: {
      color: colors.lightRoyalBlue,
      fontSize: 16,
      fontWeight: "500",
      fontFamily: "Poppins_400Regular",
      lineHeight: 24,
      marginLeft: "2%",
    },
    bottom: {
      justifyContent: "flex-end",
      backgroundColor: colors.lightRoyalBlue,
    },
  });
};
