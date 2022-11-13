import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FONTS } from "../consts";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { NavBar } from "../ui/NavBar";
import { TopBar } from "../ui/TopBar";

export function InGamePlage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme, "Medium", "Accepted");
  return (
    <SafeAreaView style={themedStyles.container}>
      <TopBar />
      <ScrollView style={themedStyles.scrollViewStyle}>
        <Text style={themedStyles.questionNameStyle}>1. Bee Road</Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 20,
            color: theme.text.default.color,
          }}
        >
          Istanbul Technical University
        </Text>
        <Text style={themedStyles.hardness}>Medium</Text>
        <Image
          style={{
            width: 300,
            height: 400,
            alignSelf: "center",
            marginTop: 4,
            borderRadius: 40,
          }}
          source={require("../assets/images/BeeArea.png")}
        />
        <Text style={themedStyles.hint}>Hints</Text>
        <Text style={themedStyles.hintContent}>
          A one can hear duck noises if listens careful enough...
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 80,
            flex: 1,
            alignItems: "center",
            marginBottom: 54,
          }}
        >
          <Text style={themedStyles.statusStyle}>Status: Accepted</Text>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              paddingRight: 24,
              alignItems: "flex-end",
              paddingLeft: 100,

              justifyContent: "center",
            }}
          >
            <Button size="xxlarge">SUBMIT</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme: Theme, hardness: string, status: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.appBackground.backgroundColor,
    },
    scrollViewStyle: {
      width: "100%",
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
      paddingRight: 20,
    },
    questionNameStyle: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 35,
      color: theme.text.default.color,
      marginTop: 16,
    },
    hardness: {
      color:
        hardness === "Easy"
          ? colors.green
          : hardness === "Medium"
          ? colors.orange
          : colors.red,
      fontFamily: FONTS.PoppinsSemiBold,
      fontSize: 20,
      marginTop: 4,
    },
    hint: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 20,
      color: theme.text.default.color,
      marginTop: 8,
    },
    hintContent: {
      color: theme.text.default.color,
      fontSize: 20,
      marginTop: 16,
    },
    statusStyle: {
      color: status === "Accepted" ? colors.green : colors.red,
      fontFamily: FONTS.PoppinsBold,
      flex: 0.5,
      justifyContent: "flex-start",
      alignSelf: "center",
      alignItems: "center",
    },
  });
};
