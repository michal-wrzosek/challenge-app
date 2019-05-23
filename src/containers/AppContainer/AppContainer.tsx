import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import { LoginScreenContainer } from '../LoginScreenContainer/LoginScreenContainer';
import { ProvidersPageContainer } from '../ProvidersPageContainer/ProvidersPageContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <LoginScreenContainer>
          <ProvidersPageContainer />
        </LoginScreenContainer>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
