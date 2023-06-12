import {
  account,
  emptySettings,
  go,
  join,
  mail,
  settings,
  treasure,
} from "../icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import { Logo } from "./Logo";
import { useState } from "react";
import { NavButton } from "./NavButton";
import { PATHS } from "../consts/paths";
import { Icon } from "./Icon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InGamePage } from "../pages/InGamePage";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/colors";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";

type navbarType = {
  pageNo: string;
};
export const NavBar = ({ pageNo }: navbarType) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation();

  const [currentPage, setCurrentPage] = useState(parseInt(pageNo));

  return (
    <View style={themedStyles.wrapper}>
      <NavButton
        as={PATHS.ACCOUNT}
        onPress={() => {
          navigator.navigate("Profile" as never, {} as never);
        }}
        isCurrentPage={currentPage === 0}
        text="ACCOUNT"
        xml={account}
        buttonWidth="33.3%"
      />

      <NavButton
        as={PATHS.HOME}
        onPress={() => {
          navigator.navigate("Home" as never, {} as never);
        }}
        isCurrentPage={currentPage === 1}
        text="HOME"
        xml={mail}
        buttonWidth="33.3%"
      >
        <View style={themedStyles.treasure}>
          <Icon xml={treasure} width="65" height="65" />
        </View>
      </NavButton>

      <NavButton
        as={PATHS.JOIN}
        onPress={() => {
          navigator.navigate("Join" as never, {} as never);
        }}
        isCurrentPage={currentPage === 2}
        text="JOIN"
        xml={join}
        buttonWidth="33.3%"
      />
    </View>
  );
};

// Styles
const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      borderTopWidth: 0.5,
      borderColor: theme.navbarBorderColor.color,
      flexDirection: "row",
      justifyContent: "center",
      height: 64,
    },
    treasure: {
      position: "absolute",
      top: "-58%",
      zIndex: 10,
    },
  });
};
