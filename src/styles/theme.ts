import { ThemeProps } from 'styled-components';

const theme = (otherTheme: ThemeProps<{}>) => ({
  ...(otherTheme ? otherTheme.theme : {}),
});

export default theme;
