import { SvgXml } from "react-native-svg";
import { useTheme } from "../theme";
import { ColorType } from "../theme/types";

type IconProps = {
  width?: string;
  height?: string;
  xml: string;
  color?: string;
  onPress?: () => void;
};

export const Icon = ({
  width = "24",
  height = "24",
  xml,
  color: colorProp,
  onPress,
  ...props
}: IconProps) => {
  const { theme } = useTheme();
  return (
    <SvgXml
      color={colorProp ?? theme.text.default.color}
      width={width}
      height={height}
      xml={xml}
      onPress={onPress}
      {...props}
    />
  );
};
