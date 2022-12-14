import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";
import { View, Image } from "react-native";

import { Theme } from "../theme/types";
import { FONTS } from "../consts";
import { Button } from "../ui/Button";
import { NavBar } from "../ui/NavBar";

import { useNavigation } from "@react-navigation/native";
import { Icon } from "../ui/Icon";
import { emptySettings, settings } from "../icons";
import { useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { colors } from "../theme/colors";
import { MarkerUnits } from "react-native-svg";

export function SettingsPage() {
  const { theme, currentTheme } = useTheme();
  const themedStyles = styles(theme);
  const [hardness, setHardness] = useState("none");
  const [music, setMusic] = useState(false);
  const [sounds, setSounds] = useState(false);
  const [notifications, setNotifications] = useState("Not Allow");
  const [hints, setHints] = useState(false);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.title}>
          <Text style={themedStyles.settingsTitle}>Settings</Text>
          <View style={themedStyles.settingsIcon}>
            <Icon xml={emptySettings} width="48" height="48" />
          </View>
        </View>
        <View style={themedStyles.defaultHardness}>
          <View style={themedStyles.defaultHardnessText}>
            <Text
              style={{
                color: theme.text.default.color,
                fontFamily: FONTS.PoppinsBold,
                fontSize: 12,
              }}
            >
              Hardness
            </Text>
          </View>
          <View style={themedStyles.noneButton}>
            <Button
              size="small"
              color={hardness === "none" ? "default" : "faded"}
              onPress={() => setHardness("none")}
              givenFontSize={10}
            >
              None
            </Button>
          </View>
          <View style={themedStyles.easyButton}>
            <Button
              size="small"
              color={hardness === "easy" ? "default" : "faded"}
              onPress={() => setHardness("easy")}
              givenFontSize={10}
            >
              Easy
            </Button>
          </View>
          <View style={themedStyles.mediumButton}>
            <Button
              size="small"
              color={hardness === "medium" ? "default" : "faded"}
              onPress={() => setHardness("medium")}
              givenFontSize={10}
            >
              Medium
            </Button>
          </View>
          <View style={themedStyles.hardButton}>
            <Button
              size="small"
              color={hardness === "hard" ? "default" : "faded"}
              onPress={() => setHardness("hard")}
              givenFontSize={10}
            >
              Hard
            </Button>
          </View>
        </View>
        <View style={themedStyles.musicandsfx}>
          <View
            style={{
              flexDirection: "row",
              flex: 0.5,
              justifyContent: "center",
            }}
          >
            <View style={{ alignSelf: "center", marginRight: 4 }}>
              <Text
                style={{
                  fontFamily: FONTS.PoppinsBold,
                  color: theme.text.default.color,
                }}
              >
                Music
              </Text>
            </View>
            <Switch
              onValueChange={() => setMusic(!music)}
              value={music}
              trackColor={{ false: "#767577", true: colors.lightRoyalBlue }}
              thumbColor={colors.white}
            ></Switch>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 0.5,
              justifyContent: "center",
            }}
          >
            <View style={{ alignSelf: "center", marginRight: 4 }}>
              <Text
                style={{
                  fontFamily: FONTS.PoppinsBold,
                  color: theme.text.default.color,
                }}
              >
                Sounds
              </Text>
            </View>
            <Switch
              onValueChange={() => setSounds(!sounds)}
              value={sounds}
              trackColor={{ false: "#767577", true: colors.lightRoyalBlue }}
              thumbColor={colors.white}
            ></Switch>
          </View>
        </View>
        <View style={themedStyles.defaultHardness}>
          <View style={themedStyles.defaultHardnessText}>
            <Text
              style={{
                color: theme.text.default.color,
                fontFamily: FONTS.PoppinsBold,
                fontSize: 12,
              }}
            >
              Notifications
            </Text>
          </View>
          <View style={themedStyles.notAllowButton}>
            <Button
              size="small"
              color={notifications === "Not Allow" ? "default" : "faded"}
              onPress={() => setNotifications("Not Allow")}
              givenFontSize={10}
            >
              Not Allow
            </Button>
          </View>
          <View style={themedStyles.onlyInChallangesButton}>
            <Button
              size="small"
              color={
                notifications === "Only for Challanges" ? "default" : "faded"
              }
              onPress={() => setNotifications("Only for Challanges")}
              givenFontSize={10}
            >
              Only for Challanges
            </Button>
          </View>
          <View style={themedStyles.allowButton}>
            <Button
              size="small"
              color={notifications === "Allow" ? "default" : "faded"}
              onPress={() => setNotifications("Allow")}
              givenFontSize={10}
            >
              Allow
            </Button>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <View style={{ alignSelf: "center", marginRight: 4 }}>
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                color: theme.text.default.color,
              }}
            >
              Hints
            </Text>
          </View>
          <Switch
            onValueChange={() => setHints(!hints)}
            value={hints}
            trackColor={{ false: "#767577", true: colors.lightRoyalBlue }}
            thumbColor={colors.white}
          ></Switch>
        </View>
      </ScrollView>
      <NavBar pageNo="4" />
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
    settingsTitle: {
      fontSize: 36,
      fontFamily: FONTS.PoppinsBold,
      color: theme.text.default.color,
    },
    title: {
      flexDirection: "row",
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    settingsIcon: { marginLeft: 12 },
    defaultHardness: {
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      marginTop: 40,
    },
    defaultHardnessText: {
      alignSelf: "center",
      fontSize: 20,
      fontFamily: FONTS.PoppinsBold,
    },
    noneButton: {
      width: "16%",
      marginLeft: "4%",
    },
    easyButton: {
      width: "16%",
      marginLeft: "1.2%",
    },
    mediumButton: {
      width: "16%",
      marginLeft: "1.2%",
    },
    hardButton: {
      width: "16%",
      marginLeft: "1.2%",
    },
    musicandsfx: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      marginTop: 40,
    },
    notAllowButton: {
      marginLeft: "4%",
      width: "20%",
    },
    onlyInChallangesButton: {
      marginLeft: "2%",
      width: "30%",
    },
    allowButton: {
      marginLeft: "2%",
      width: "16%",
    },
  });
};
