import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import { LoginScreenContainer } from '../LoginScreenContainer/LoginScreenContainer';
import { ProvidersPageContainer } from '../ProvidersPageContainer/ProvidersPageContainer';
import { PageLayout } from '../../components/PageLayout/PageLayout';

export const AppContainer: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <LoginScreenContainer>
          <PageLayout>
            <ProvidersPageContainer />
          </PageLayout>
        </LoginScreenContainer>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};
