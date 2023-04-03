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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";
import { useTreasureById } from "../react-query/hooks";
import { Loading } from "./Loading";

export function JoinPage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation();
  const [pin, setPin] = useState("");
  const [placeholderColor, setPlaceholderColor] = useState(
    theme.pin.placeholderColor
  );
  const [curPlaceholder, setCurPlaceholder] = useState("PIN");

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
                <Button size="xlarge" color="default">
                  JOIN
                </Button>
              </View>
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
