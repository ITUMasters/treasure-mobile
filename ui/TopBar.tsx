import { checkbox_checked, checkbox_unchecked, treasure } from "../icons";
import { View, Text, Image } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { Icon } from "./Icon";
import { FONTS } from "../consts";

type TopBar = {};

export const TopBar = ({}: TopBar) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: 72,
        flexDirection: "row",
        backgroundColor: theme.navButton.backgroundColor,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: 24,
          width: "100%",
        }}
      >
        <Image source={require("../assets/images/navbarIcon.png")} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Icon xml={treasure} width="56" height="56" />
      </View>

      <View
        style={{
          height: "100%",
          flex: 1,
          flexDirection: "row",
          paddingRight: 24,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            height: "100%",
            marginTop: 4,
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsRegular,
              fontSize: 22,
              marginTop: "auto",
              marginBottom: "auto",
              color: theme.text.default.color,
              alignSelf: "center",
            }}
          >
            150
          </Text>
        </View>
        <Image
          source={require("../assets/images/coin.png")}
          style={{
            width: 30,
            height: 30,
            marginLeft: 6,
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
};
