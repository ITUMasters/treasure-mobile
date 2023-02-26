import { Theme } from '../theme/types';
import { colors } from './colors';

export const light: Theme = {
  text: {
    default: {
      color: colors.black,
    },
  },
  button: {
    default: {
      textColor: colors.white,
      backgroundColor: colors.lightRoyalBlue,
      disabledBackgroundColor: colors.lightPurple,
    },
  },
  input: {
    textColor: colors.black,
    backgroundColor: colors.lightGrey,
    placeholderColor: colors.darkGrey,
  },
  appBackground: {
    backgroundColor: colors.white,
  },
  navButton: {
    textColor: colors.white,
    borderColor: colors.lightRoyalBlue,
    backgroundColor: colors.lightRoyalBlue,
    pressedBackgroundColor: '#f0c419',
    pressedIconColor: colors.lightRoyalBlue,
  },
  icon: {
    color: colors.black,
  },
  drawerNavbarTopHeader: {
    backgroundColor: colors.lightRoyalBlue,
    textColor: colors.white,
  },
  bottomSheet: {
    bg: colors.white,
    thumb: colors.black,
  },
};

