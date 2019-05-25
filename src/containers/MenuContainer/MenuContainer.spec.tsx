import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { MenuContainer } from './MenuContainer';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import theme from '../../styles/theme';

describe('containers/MenuContainer/MenuContainer', () => {
  it('renders', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <MenuContainer />
        </AuthenticationProvider>
      </ThemeProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
