import { Theme } from '../theme/types';

type NavBarColorsReturnType = {
  textColor: string;
  pressedBackgroundColor: string;
  backgroundColor: string;
  borderColor: string;
  pressedIconColor: string;
};

export const getNavBarColorsByTheme = (
  theme: Theme,
): NavBarColorsReturnType => {
  return {
    textColor: theme.navButton.textColor,
    pressedBackgroundColor: theme.navButton.pressedBackgroundColor,
    backgroundColor: theme.navButton.backgroundColor,
    borderColor: theme.navButton.borderColor,
    pressedIconColor: theme.navButton.pressedIconColor,
  };
};

