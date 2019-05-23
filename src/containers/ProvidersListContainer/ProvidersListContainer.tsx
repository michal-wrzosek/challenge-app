import React from 'react';
import { ProvidersContext } from '../../context/ProvidersContext/ProvidersContext';
import { useProvidersSubscription } from '../../hooks/useProvidersSubscription';

export const ProvidersListContainer = () => {
  const { providersSubject } = React.useContext(ProvidersContext);

  const { providers: initialProviders } = providersSubject.getValue();

  const [providers, setProviders] = React.useState(initialProviders);

  useProvidersSubscription(({ providers }) => {
    setProviders(providers);
  });

  return (
    <ul>
      {providers &&
        providers.map(provider => (
          <li key={`provider_${provider._id}`}>
            <div>Name: {provider.name}</div>
          </li>
        ))}
    </ul>
  );
};
