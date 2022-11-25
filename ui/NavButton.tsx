import { FONTS } from "../consts";
import { PATHS } from "../consts/paths";
import React, { ComponentPropsWithoutRef } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Theme } from "../theme/types";
import { getNavBarColorsByTheme } from "../utils/navBarStyles";

import { Icon } from "./Icon";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../theme/colors";

interface NavButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  as: string;
  onPress?: () => void;
  text: string;
  xml: string;
  buttonWidth: string;
  isCurrentPage: boolean;
}

export function NavButton({
  as,
  activeOpacity = 0.8,
  onPress,
  text,
  xml,
  buttonWidth,
  children,
  isCurrentPage = false,
  ...props
}: NavButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme, buttonWidth, isCurrentPage);
  let currentColor;
  if (text === "HOME") {
    if (isCurrentPage) {
      currentColor = theme.navButton.pressedBackgroundColor;
    } else {
      currentColor = theme.navButton.backgroundColor;
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={themedStyles.wrapper}
      onPress={onPress}
      {...props}
    >
      <Icon color={currentColor} xml={xml} width="52" height="28" />
      {children}
      <Text numberOfLines={1} style={themedStyles.textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = (theme: Theme, buttonWidth: string, isCurrentPage: boolean) => {
  const {
    textColor,
    pressedBackgroundColor,
    backgroundColor,
    borderColor,
    pressedIconColor,
  } = getNavBarColorsByTheme(theme);

  return StyleSheet.create({
    wrapper: {
      backgroundColor: isCurrentPage ? pressedBackgroundColor : backgroundColor,
      borderColor: borderColor,
      borderWidth: 0.5,
      width: buttonWidth,
      padding: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    textStyle: {
      fontSize: 10,
      marginBottom: 8,
      color: isCurrentPage ? pressedIconColor : textColor,
      fontFamily: FONTS.PoppinsBold,
      position: "relative",
    },
    icon: {
      marginBottom: 4,
      color: isCurrentPage ? pressedIconColor : textColor,
    },
  });
};
