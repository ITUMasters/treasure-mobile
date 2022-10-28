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
      textColor: colors.black,
      backgroundColor: colors.lightRoyalBlue,
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
    textColor: colors.black,
    borderColor: colors.black,
    backgroundColor: colors.white,
    pressedBackgroundColor: colors.lightGrey,
    pressedIconColor: colors.lightRoyalBlue,
  },
  icon: {
    color: colors.black,
  },
};
