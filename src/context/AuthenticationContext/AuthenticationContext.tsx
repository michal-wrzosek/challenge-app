import * as React from 'react';
import fetch from 'unfetch';

import { Subject } from '../../util/reactive/Subject';
import { API } from '../../configuration/envs';

export interface AuthenticationSubjectData {
  email?: string;
  token?: string;
  isLoading: boolean;
  errorMessage?: string;
}

interface AuthenticationLocalStorage {
  email: string;
  token: string;
}

type AuthenticateFunc = (email: string, password: string) => Promise<void>;
type LogoutFunc = () => void;

export interface AuthenticationContextValues {
  authenticationSubject: Subject<AuthenticationSubjectData>;
  authenticate: AuthenticateFunc;
}

const LOCAL_STORAGE_KEY = 'authentication_token';

export const AuthenticationContext = React.createContext<
  AuthenticationContextValues
>({} as any);

function getTokenFromLocalStorage(): AuthenticationLocalStorage | undefined {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    return token ? JSON.parse(token) : undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

function syncLocalStorage({ email, token }: AuthenticationLocalStorage) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email, token }));
  } catch (err) {
    console.error(err);
  }
}

function clearLocalStorage() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
}

async function fetchToken(email: string, password: string) {
  try {
    const response = await fetch(`${API}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function validateToken(email: string, token: string) {
  try {
    const response = await fetch(`${API}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      user: { email: responseEmail },
    } = await response.json();
    return responseEmail === email;
  } catch (error) {
    return undefined;
  }
}

const authenticationSubject = new Subject<AuthenticationSubjectData>({
  isLoading: true,
});

export const AuthenticationProvider: React.FC = ({ children }) => {
  const isFirst = React.useRef(true);

  React.useEffect(() => {
    const localStorageData = getTokenFromLocalStorage();

    if (localStorageData) {
      const { email, token } = localStorageData;

      validateToken(email, token)
        .then(isValid => {
          if (isValid) {
            authenticationSubject.next({ email, token, isLoading: false });
          } else {
            clearLocalStorage();
            authenticationSubject.next({
              email,
              isLoading: false,
              errorMessage: 'Wrong credentials',
            });
          }
        })
        .catch(err => {
          console.error(err);
          clearLocalStorage();
          authenticationSubject.next({ isLoading: false });
        });
    } else {
      authenticationSubject.next({ isLoading: false });
    }

    isFirst.current = false;

    return () => {
      authenticationSubject.destroy();
    };
  }, [isFirst]);

  const update = (authenticationSubjectData: AuthenticationSubjectData) => {
    authenticationSubject.next(authenticationSubjectData);

    if (authenticationSubjectData.email && authenticationSubjectData.token) {
      syncLocalStorage({
        email: authenticationSubjectData.email,
        token: authenticationSubjectData.token,
      });
    }
  };

  const authenticate: AuthenticateFunc = async (email, password) => {
    update({ isLoading: true });

    const token = await fetchToken(email, password);

    if (token) {
      update({ email, token, isLoading: false });
    } else {
      update({ isLoading: false, errorMessage: 'Wrong credentials' });
    }
  };

  const logout: LogoutFunc = () => {
    clearLocalStorage();
    update({ isLoading: false });
  };

  return (
    <AuthenticationContext.Provider
      value={{ authenticate, logout, authenticationSubject }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
