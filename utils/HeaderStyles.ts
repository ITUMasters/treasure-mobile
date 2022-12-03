import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";

export const getHeaderStylesByTheme = (
  theme: Theme
): DrawerNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: theme.drawerNavbarTopHeader.backgroundColor,
    },
    headerTitleStyle: {
      color: theme.drawerNavbarTopHeader.textColor,
    },
    headerTitleAlign: "center",
  };
};
