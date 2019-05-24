import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { ProvidersListContainer } from './ProvidersListContainer';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import theme from '../../styles/theme';
import { ProvidersProvider } from '../../context/ProvidersContext/ProvidersContext';

describe('containers/ProvidersListContainer/ProvidersListContainer', () => {
  it('renders', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <ProvidersProvider>
            <ProvidersListContainer />
          </ProvidersProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
