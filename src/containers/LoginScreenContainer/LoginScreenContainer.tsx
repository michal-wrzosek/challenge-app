import React from 'react';

import { AuthenticationContext } from '../../context/AuthenticationContext/AuthenticationContext';
import { useAuthenticationSubscription } from '../../hooks/useAuthenticationSubscription';
import { LogInScreen } from '../../components/LogInScreen/LogInScreen';
import { LogInForm } from '../../components/LogInForm/LogInForm';

export const LoginScreenContainer: React.FC = ({ children }) => {
  const { authenticationSubject, authenticate } = React.useContext(
    AuthenticationContext
  );
  const [auth, setAuth] = React.useState(authenticationSubject.getValue());

  useAuthenticationSubscription(auth => {
    setAuth(auth);
  }, []);

  const { token, isLoading, errorMessage } = auth;

  if (!token) {
    return (
      <LogInScreen>
        <LogInForm
          isLoading={isLoading}
          authenticate={authenticate}
          errorMessage={errorMessage}
        />
      </LogInScreen>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};
