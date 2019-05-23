import * as React from 'react';

import { Subscriber, Subscription } from '../util/reactive/Subject';
import {
  AuthenticationContext,
  AuthenticationSubjectData,
} from '../context/AuthenticationContext/AuthenticationContext';

export function useAuthenticationSubscription(
  subscriber: Subscriber<AuthenticationSubjectData>,
  deps?: any[]
) {
  const { authenticationSubject } = React.useContext(AuthenticationContext);

  React.useEffect(() => {
    let authenticationSubscription: Subscription = null as any;
    if (authenticationSubject) {
      subscriber(authenticationSubject.getValue());
      authenticationSubscription = authenticationSubject.subscribe(subscriber);
    }
    return () => {
      authenticationSubscription && authenticationSubscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
