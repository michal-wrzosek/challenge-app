import { ThemeProps } from 'styled-components';

// rem
export const spaces = [
  0.4, /// 0
  0.8, /// 1
  1.6, // 2
  2.4, // 3
  4.8, // 4
];

// rem
export const fontSizes = [
  1, //// 0
  1.2, // 1
  1.8, // 2
  2.4, // 3
  4.8, // 4
];

export const colors = {
  white: '#FFFFFF',
  grey1: '#f6f6f6',
  maastrichtBlue: "#011627",
  tractorRed: "#F71735",
  tractorRedFadeOut: "#F68392",
  turquoise: "#41EAD4",
  babyPowder: "#FDFFFC",
  brightYellowCrayola: "#FF9F1C",
};

export const fontWeights = {
  normal: 400,
  bold: 700,
};

const theme = (otherTheme: ThemeProps<{}>) => ({
  ...(otherTheme ? otherTheme.theme : {}),
  spaces,
  fontSizes,
  fontWeights,
  colors,

  textInput: {
    borderColor: colors.grey1,
    bgColor: colors.white,
    borderRadius: 0.5,
  },

  button: {
    primary: {
      bgColor: colors.tractorRed,
      bgColorDisabled: colors.tractorRedFadeOut,
      color: colors.white,
      colorDisabled: colors.white,
      borderRadius: 0.5,
    },
    secondary: {
      bgColor: colors.babyPowder,
      bgColorDisabled: colors.babyPowder,
      color: colors.tractorRed,
      colorDisabled: colors.tractorRedFadeOut,
      borderRadius: 0.5,
    },
  },

  loginForm: {
    errorMessage: {
      bgColor: colors.tractorRed,
      color: colors.white,
      borderRadius: 0.5,
    }
  }
});

export default theme;
