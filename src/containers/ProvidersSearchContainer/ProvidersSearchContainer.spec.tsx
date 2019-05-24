import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { ProvidersSearchContainer } from './ProvidersSearchContainer';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import theme from '../../styles/theme';
import { ProvidersProvider } from '../../context/ProvidersContext/ProvidersContext';

describe('containers/ProvidersSearchContainer/ProvidersSearchContainer', () => {
  it('renders', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <ProvidersProvider>
            <ProvidersSearchContainer />
          </ProvidersProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
