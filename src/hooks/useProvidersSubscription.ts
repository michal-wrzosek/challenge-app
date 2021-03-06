import * as React from 'react';

import { Subscriber, Subscription } from '../util/reactive/Subject';
import { ProvidersContext } from '../context/ProvidersContext/ProvidersContext';
import { ProvidersSubjectData } from '../context/ProvidersContext/types';

export function useProvidersSubscription(
  subscriber: Subscriber<ProvidersSubjectData>,
  deps?: any[]
) {
  const { providersSubject } = React.useContext(ProvidersContext);

  React.useEffect(() => {
    let providersSubscription: Subscription = null as any;
    if (providersSubject) {
      subscriber(providersSubject.getValue());
      providersSubscription = providersSubject.subscribe(subscriber);
    }
    return () => {
      providersSubscription && providersSubscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
