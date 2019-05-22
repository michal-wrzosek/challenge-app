import { ThemeProps } from 'styled-components';

// em
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

export const fontWeights = {
  normal: 400,
  bold: 700,
};

const theme = (otherTheme: ThemeProps<{}>) => ({
  ...(otherTheme ? otherTheme.theme : {}),
  spaces,
  fontSizes,
  fontWeights,
});

export default theme;
