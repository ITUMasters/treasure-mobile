import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { NavBar } from "../ui/NavBar";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../theme/colors";
import { Icon } from "../ui/Icon";
import { leftArrowPurple, leftArrowWhite } from "../icons";
import { useNavigation } from "@react-navigation/native";

export function ShareTreasure({ route }: any) {
  const { theme, currentTheme } = useTheme();
  const themedStyles = styles(theme);
  const routeParams = route.params ?? route.params;

  function generateURL(treasureId: number, interactionId: number) {
    return (
      "exp://192.168.137.78:19000/--/game/" +
      treasureId.toString() +
      "/" +
      interactionId.toString()
    );
  }

  const navigator = useNavigation();
  const goBack = () => {
    navigator.navigate("InGame" as never, route.params as never);
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.goBackBar}>
          <View style={themedStyles.goBackIcon}>
            <Icon
              xml={currentTheme === "light" ? leftArrowPurple : leftArrowWhite}
              width="28"
              height="28"
              onPress={goBack}
            ></Icon>
          </View>
        </View>
        <View style={themedStyles.qr}>
          <QRCode
            size={300}
            value={generateURL(
              routeParams.treasureId,
              routeParams.interactionId
            )}
          />
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
    qr: {
      marginTop: 180,
      justifyContent: "center",
      alignItems: "center",
    },
    goBackBar: {
      backgroundColor: theme.appBackground.backgroundColor,
      width: "100%",
      height: 28,
    },
    goBackIcon: {
      marginLeft: 15,
    },
  });
};
