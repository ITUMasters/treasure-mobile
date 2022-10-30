import { checkbox_checked, checkbox_unchecked } from "../icons";
import { ComponentPropsWithoutRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
  buttonProps?: ComponentPropsWithoutRef<typeof TouchableOpacity>;
};

export const Checkbox = ({
  checked,
  onPress,
  disabled,
  buttonProps,
  ...props
}: CheckboxProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} {...buttonProps}>
      <SvgXml
        color={checked ? "#006FFF" : theme.text.default.color}
        xml={checked ? checkbox_checked : checkbox_unchecked}
        {...props}
      />
    </TouchableOpacity>
  );
};
