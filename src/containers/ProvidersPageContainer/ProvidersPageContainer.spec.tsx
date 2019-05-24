import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { ProvidersPageContainer } from './ProvidersPageContainer';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import theme from '../../styles/theme';
import { ProvidersProvider } from '../../context/ProvidersContext/ProvidersContext';

describe('containers/ProvidersPageContainer/ProvidersPageContainer', () => {
  it('renders', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <ProvidersProvider>
            <ProvidersPageContainer />
          </ProvidersProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
