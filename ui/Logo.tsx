import { View } from "react-native";
import { treasure } from "../icons";
import { colors } from "../theme/colors";
import { Icon } from "./Icon";

type LogoProps = {};
export const Logo = ({}: LogoProps) => {
  return (
    <View
      style={{
        backgroundColor: colors.lightRoyalBlue,
        width: 160,
        height: 160,
        borderRadius: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon xml={treasure} width="100" height="100" />
    </View>
  );
};
