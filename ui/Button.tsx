import { FONTS } from "../consts";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Theme } from "../theme/types";
import {
  getButtonColorsByThemeAndColorProp,
  getButtonSizesBySizeProp,
} from "../utils/buttonStyles";
import { Icon } from "./Icon";
import { google } from "../icons";
import { colors } from "../theme/colors";

export type ButtonSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";
export type ButtonBending = "low" | "high";
export type ButtonColor = "default";

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  size: ButtonSize;
  color?: ButtonColor;
  bending?: ButtonBending;
  xml?: string;
}

export function Button({
  activeOpacity = 0.8,
  children,
  disabled,
  onPress,
  size,
  color = "default",
  bending = "low",
  xml,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme, color, size, bending, disabled, xml);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={themedStyles.wrapper}
      onPress={onPress}
      {...props}
    >
      <View style={themedStyles.logoView}>
        {xml !== undefined && <Icon xml={xml} />}
        <Text style={themedStyles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Styles

const styles = (
  theme: Theme,
  colorProp: ButtonColor,
  size: ButtonSize,
  bending: ButtonBending,
  disabled?: boolean,
  xml?: string
) => {
  const { textColor, backgroundColor } = getButtonColorsByThemeAndColorProp(
    theme,
    colorProp
  );
  const { height, radius, fontSize } = getButtonSizesBySizeProp(size, bending);
  const isXmlExists: boolean = xml !== undefined;

  return StyleSheet.create({
    wrapper: {
      backgroundColor: isXmlExists ? colors.white : backgroundColor,
      height: height,
      width: "100%",
      borderRadius: radius,
      opacity: disabled ? 0.5 : 1,
      overflow: "hidden",
    },
    text: {
      color: isXmlExists ? colors.black : textColor,
      fontSize: isXmlExists ? 16 : fontSize,
      fontFamily: isXmlExists ? FONTS.PoppinsBold : FONTS.PoppinsRegular,
      paddingLeft: isXmlExists ? 4 : 0,
      paddingTop: isXmlExists ? 4.5 : 0,
    },
    logoView: {
      flexDirection: "row",
      width: "100%",
      height: "100%",
      borderWidth: 0.6,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderColor: isXmlExists
        ? colors.lightGrey
        : theme.appBackground.backgroundColor,
    },
  });
};
