import { Theme } from "../theme/types";
import { ButtonColor } from "../ui/Button";
import { InputSize } from "../ui/Input";

type InputSizesReturnType = {
  height: number;
  radius: number;
};

export const getInputSizesBySizeProp = (
  size: InputSize
): InputSizesReturnType => {
  switch (size) {
    case "medium": {
      return {
        height: 50,
        radius: 8,
      };
    }
    case "large": {
      return {
        height: 75,
        radius: 8,
      };
    }
  }
};

type InputColorsReturnType = {
  textColor: string;
  backgroundColor: string;
  placeholderColor: string;
};
export const getInputColorsByTheme = (theme: Theme): InputColorsReturnType => {
  return {
    textColor: theme.input.textColor,
    backgroundColor: theme.input.backgroundColor,
    placeholderColor: theme.input.placeholderColor,
  };
};
