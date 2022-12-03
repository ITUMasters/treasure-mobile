import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { View, Image, Text, Switch } from "react-native";

import { Theme } from "../theme/types";
import { FONTS } from "../consts";
import { Button } from "../ui/Button";
import { colors } from "../theme/colors";
import { NavBar } from "../ui/NavBar";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

export function ProfilePage() {
  const { theme, toggle, currentTheme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation();

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.topPart}>
          <View style={themedStyles.imageViewStyle}>
            <Image
              style={themedStyles.imageStyle}
              source={require("../assets/images/alpImage.png")}
            ></Image>
          </View>
          <View style={themedStyles.middleTopPart}>
            <Text style={themedStyles.name}>Faruk Avci</Text>
            <Text style={themedStyles.username}>farukkastamonuda</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={themedStyles.badgeStyle}
                source={require("../assets/images/badge.png")}
              ></Image>
              <Image
                style={themedStyles.mapImageStyle}
                source={require("../assets/images/map.png")}
              ></Image>
            </View>
          </View>
          <View style={themedStyles.gold}>
            <Text style={themedStyles.goldAmount}>150</Text>
            <Image
              source={require("../assets/images/coin.png")}
              style={themedStyles.goldImage}
            ></Image>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            marginLeft: 24,
            flex: 1,
          }}
        >
          <View style={{ flex: 0.35, alignItems: "center" }}>
            <View style={{ width: 112 }}>
              <Button
                size="xlarge"
                bending="high"
                onPress={() => {
                  navigator.navigate(PATHS.EDIT_PROFILE as never);
                }}
              >
                Edit Profile
              </Button>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: 0.65,
            }}
          >
            <Switch
              style={themedStyles.switchStyle}
              onValueChange={toggle}
              value={currentTheme === "dark"}
              trackColor={{ false: "#767577", true: colors.blue }}
              thumbColor={colors.white}
            ></Switch>
            <Text
              style={{
                color: theme.text.default.color,
                fontFamily: FONTS.PoppinsMedium,
              }}
            >
              Dark Theme
            </Text>
          </View>
        </View>
      </ScrollView>
      <NavBar pageNo="0" />
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
    topPart: {
      flex: 1,
      marginLeft: 24,
      marginTop: 32,
      flexDirection: "row",
    },
    imageStyle: {
      width: 96,
      height: 96,
      borderRadius: 60,
      alignSelf: "center",
    },
    imageViewStyle: {
      flex: 0.35,
      justifyContent: "center",
    },
    middleTopPart: {
      flex: 0.45,
      marginLeft: 24,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    badgeStyle: {
      width: 32,
      height: 32,
    },
    mapImageStyle: {
      width: 32,
      height: 32,
      marginLeft: 12,
    },
    name: {
      color: theme.text.default.color,
      fontFamily: FONTS.PoppinsBold,
      fontSize: 16,
    },
    username: {
      color: theme.text.default.color,
      fontFamily: FONTS.PoppinsBold,
      fontSize: 13,
    },
    gold: {
      flex: 0.2,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      marginRight: 16,
    },
    goldAmount: {
      color: theme.text.default.color,
      marginRight: 4,
      fontSize: 18,
      justifyContent: "center",
    },
    goldImage: {
      width: 24,
      height: 24,
    },
    switchStyle: {
      marginLeft: 20,
    },
  });
};
