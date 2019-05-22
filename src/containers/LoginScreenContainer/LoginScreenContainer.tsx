import React from 'react';

import { AuthenticationContext } from '../../context/AuthenticationContext/AuthenticationContext';
import { useAuthenticationSubscription } from '../../hooks/useAuthentication';
import { LogInForm } from '../../components/LogInForm/LogInForm';

export const LoginScreenContainer: React.FC = ({ children }) => {
  const { authenticationSubject, authenticate } = React.useContext(
    AuthenticationContext
  );
  const [auth, setAuth] = React.useState(authenticationSubject.getValue());

  useAuthenticationSubscription(auth => {
    console.log('useAuthenticationSubscription');
    setAuth(auth);
  }, []);

  const { token, isLoading, errorMessage } = auth;

  console.log(isLoading);

  if (!token) {
    return (
      <LogInForm
        isLoading={isLoading}
        authenticate={authenticate}
        errorMessage={errorMessage}
      />
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};
