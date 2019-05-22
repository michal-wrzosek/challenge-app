import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';
import { AuthenticationProvider } from '../../context/AuthenticationContext/AuthenticationContext';
import { LoginScreenContainer } from '../LoginScreenContainer/LoginScreenContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <LoginScreenContainer>
          <div>App</div>
        </LoginScreenContainer>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
