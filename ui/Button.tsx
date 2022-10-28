import { FONTS } from "../consts";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Theme } from "../theme/types";
import {
  getButtonColorsByThemeAndColorProp,
  getButtonSizesBySizeProp,
} from "../utils/buttonStyles";

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
}

export function Button({
  activeOpacity = 0.8,
  children,
  disabled,
  onPress,
  size,
  color = "default",
  bending = "low",
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme, color, size, bending, disabled);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={themedStyles.wrapper}
      onPress={onPress}
      {...props}
    >
      <Text style={themedStyles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

// Styles

const styles = (
  theme: Theme,
  colorProp: ButtonColor,
  size: ButtonSize,
  bending: ButtonBending,
  disabled?: boolean
) => {
  const { textColor, backgroundColor } = getButtonColorsByThemeAndColorProp(
    theme,
    colorProp
  );
  const { height, radius, fontSize } = getButtonSizesBySizeProp(size, bending);

  return StyleSheet.create({
    wrapper: {
      backgroundColor: backgroundColor,
      height: height,
      width: "100%",
      borderRadius: radius,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.5 : 1,
      overflow: "hidden",
    },
    text: {
      color: textColor,
      fontSize,
      fontFamily: FONTS.PoppinsRegular,
    },
  });
};
