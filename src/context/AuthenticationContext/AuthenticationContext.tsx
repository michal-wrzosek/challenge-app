import * as React from 'react';

import { Subject } from '../../util/reactive/Subject';

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

function promiseTimeout(time: number) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}

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
  await promiseTimeout(3000);

  if (email === 'example@user.com' && password === 'password') {
    return 'fake_token' as string;
  } else {
    return undefined;
  }
}

async function validateToken(email: string, token: string) {
  await promiseTimeout(3000);

  return email === 'example@user.com' && token === 'fake_token' ? true : false;
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
