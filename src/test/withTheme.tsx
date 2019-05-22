import * as React from 'react';
import { mount, render, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

export const mountWithTheme = (children: any) =>
  mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export const renderWithTheme = (children: any) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export const shallowWithTheme = (children: any) =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
