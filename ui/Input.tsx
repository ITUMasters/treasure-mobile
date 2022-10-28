import { FONTS } from "../consts";
import React, { ComponentPropsWithoutRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import {
  getInputColorsByTheme,
  getInputSizesBySizeProp,
} from "../utils/inputStyles";

import { Icon } from "./Icon";
import { colors } from "../theme/colors";

export type InputSize = "medium" | "large";

interface InputProps extends ComponentPropsWithoutRef<typeof TextInput> {
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  size: InputSize;
  xml?: string;
  inputTextHeight?: number;
  fontSize?: number;
  isPassword?: boolean;
  title?: string;
}

export function Input({
  value,
  disabled = false,
  onChangeText,
  size,
  xml,
  inputTextHeight,
  fontSize,
  isPassword = false,
  title,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  const themedStyles = styles(theme, size, disabled, isPassword);

  return (
    <View style={themedStyles.viewStyle}>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={onChangeText}
        maxLength={30}
        secureTextEntry={isPassword}
        {...props}
        placeholderTextColor={theme.input.placeholderColor}
        style={themedStyles.wrapper}
      />
      {xml != null && (
        <View style={themedStyles.iconStyle}>
          <Icon xml={xml} />
        </View>
      )}
      <Text style={themedStyles.titleStyle}>{title}</Text>
    </View>
  );
}

const styles = (
  theme: Theme,
  size: InputSize,
  disabled: boolean,
  isPassword: boolean
) => {
  const { textColor, backgroundColor } = getInputColorsByTheme(theme);
  const { height, radius } = getInputSizesBySizeProp(size);
  return StyleSheet.create({
    wrapper: {
      backgroundColor: backgroundColor,
      color: isPassword ? colors.lightRoyalBlue : textColor,
      height: height,
      width: "100%",
      borderRadius: radius,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.5 : 1,
      alignSelf: "center",
      overflow: "hidden",
      fontFamily: FONTS.PoppinsRegular,
      paddingLeft: 14,
      fontSize: isPassword ? 18 : 15,
      flex: 1,
      paddingTop: size === "medium" ? 24.5 : 30,
    },

    viewStyle: {
      flexDirection: "row",
    },

    iconStyle: {
      position: "absolute",
      alignSelf: "center",
      right: 13,
    },

    titleStyle: {
      position: "absolute",
      left: 14,
      fontSize: 13,
      color: textColor,
      marginTop: size === "medium" ? 5.5 : 20,
    },
  });
};
