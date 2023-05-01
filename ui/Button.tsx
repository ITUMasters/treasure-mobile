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
import { colors } from "../theme/colors";

export type ButtonSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";
export type ButtonBending = "low" | "high";
export type ButtonColor = "default" | "faded";

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  size: ButtonSize;
  color?: ButtonColor;
  bending?: ButtonBending;
  xml?: string;
  iconAtTheRight?: string;
  givenFontSize?: number;
  anotherBgColor?: string;
  anotherTextColor?: string;
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
  iconAtTheRight,
  givenFontSize,
  anotherBgColor,
  anotherTextColor,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(
    theme,
    color,
    size,
    bending,
    disabled,
    xml,
    givenFontSize,
    anotherBgColor,
    anotherTextColor
  );

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
        {iconAtTheRight !== undefined && (
          <View style={themedStyles.rightIcon}>
            <Icon xml={iconAtTheRight} />
          </View>
        )}
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
  xml?: string,
  givenFontSize?: number,
  anotherBgColor?: string | undefined,
  anotherTextColor?: string | undefined
) => {
  const { textColor, backgroundColor } = getButtonColorsByThemeAndColorProp(
    theme,
    colorProp
  );
  const { height, radius, fontSize } = getButtonSizesBySizeProp(size, bending);
  const isXmlExists: boolean = xml !== undefined;

  return StyleSheet.create({
    wrapper: {
      backgroundColor: isXmlExists
        ? colors.white
        : anotherBgColor !== undefined
        ? anotherBgColor
        : backgroundColor,
      height: height,
      width: "100%",
      borderRadius: radius,
      opacity: disabled ? 0.5 : 1,
      overflow: "hidden",
    },
    text: {
      color: isXmlExists
        ? colors.black
        : anotherTextColor !== undefined
        ? anotherTextColor
        : textColor,
      fontSize: givenFontSize ? givenFontSize : isXmlExists ? 16 : fontSize,
      fontFamily: isXmlExists ? FONTS.PoppinsBold : FONTS.PoppinsSemiBold,
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
        : anotherTextColor !== undefined
        ? anotherTextColor
        : theme.appBackground.backgroundColor,
    },
    rightIcon: {
      marginLeft: 4,
      alignSelf: "center",
      justifyContent: "flex-end",
      marginRight: 0,
    },
  });
};
