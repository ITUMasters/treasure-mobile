export type ColorType = {
  white: string;
  black: string;
  green: string;
  orange: string;
  red: string;
  lightRoyalBlue: string;
  darkRoyalBlue: string;
  lightGrey: string;
  darkGrey: string;
  mediumRoyalBlue: string;
  blue: string;
  lightPurple: string;
};

export type Theme = {
  text: {
    default: {
      color: string;
    };
  };
  button: {
    default: {
      textColor: string;
      backgroundColor: string;
    };
  };
  input: {
    textColor: string;
    backgroundColor: string;
    placeholderColor: string;
  };
  appBackground: {
    backgroundColor: string;
  };
  navButton: {
    textColor: string;
    borderColor: string;
    backgroundColor: string;
    pressedBackgroundColor: string;
    pressedIconColor: string;
  };
  icon: {
    color: string;
  };
  drawerNavbarTopHeader: {
    backgroundColor: string;
    textColor: string;
  };
};

export type ThemeOption = "dark" | "light";
export type ThemeContextProps = {
  currentTheme: ThemeOption;
  toggle: () => void;
  theme: Theme;
};
