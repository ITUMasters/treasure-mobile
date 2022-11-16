import { Theme } from "../theme/types";
import { colors } from "./colors";

export const dark: Theme = {
  text: {
    default: {
      color: colors.white,
    },
  },
  button: {
    default: {
      textColor: colors.white,
      backgroundColor: colors.lightRoyalBlue,
    },
  },
  input: {
    textColor: colors.white,
    backgroundColor: colors.mediumRoyalBlue,
    placeholderColor: colors.lightGrey,
  },
  appBackground: {
    backgroundColor: colors.darkRoyalBlue,
  },
  navButton: {
    textColor: colors.white,
    borderColor: colors.lightRoyalBlue,
    backgroundColor: colors.lightRoyalBlue,
    pressedBackgroundColor: "#f0c419",
    pressedIconColor: colors.lightRoyalBlue,
  },
  icon: {
    color: colors.white,
  },
};
