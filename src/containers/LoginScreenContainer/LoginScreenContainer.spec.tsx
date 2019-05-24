import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { LoginScreenContainer } from './LoginScreenContainer';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import theme from '../../styles/theme';

describe('containers/LoginScreenContainer/LoginScreenContainer', () => {
  it('renders', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <LoginScreenContainer />
        </AuthenticationProvider>
      </ThemeProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
