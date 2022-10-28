import { Theme } from "../theme/types";
import { ButtonColor, ButtonBending, ButtonSize } from "../ui/Button";

type ButtonSizesReturnType = {
  height: number;
  radius: number;
  fontSize: number;
};
export const getButtonSizesBySizeProp = (
  size: ButtonSize,
  bending: ButtonBending
): ButtonSizesReturnType => {
  const radius = bending === "low" ? 8 : 20;
  switch (size) {
    case "small": {
      return {
        height: 35,
        radius,
        fontSize: 16,
      };
    }
    case "medium": {
      return {
        height: 40,
        radius,
        fontSize: 19,
      };
    }
    case "large": {
      return {
        height: 45,
        radius,
        fontSize: 22,
      };
    }
    case "xlarge": {
      return {
        height: 50,
        radius,
        fontSize: 24,
      };
    }

    case "xxlarge": {
      return {
        height: 55,
        radius,
        fontSize: 26,
      };
    }
  }
};

type ButtonColorsReturnType = {
  textColor: string;
  backgroundColor: string;
};
export const getButtonColorsByThemeAndColorProp = (
  theme: Theme,
  color: ButtonColor
): ButtonColorsReturnType => {
  switch (color) {
    case "default": {
      return {
        textColor: theme.button.default.textColor,
        backgroundColor: theme.button.default.backgroundColor,
      };
    }
  }
};
