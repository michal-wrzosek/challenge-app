import React from 'react';
import { ProvidersContext } from '../../context/ProvidersContext/ProvidersContext';
import { useProvidersSubscription } from '../../hooks/useProvidersSubscription';
import { Pagination } from '../../components/Pagination/Pagination';

export const ProvidersListContainer = () => {
  const { providersSubject, providersSearch } = React.useContext(
    ProvidersContext
  );

  const {
    providers: initialProviders,
    pagination,
  } = providersSubject.getValue();

  const [providers, setProviders] = React.useState(initialProviders);

  useProvidersSubscription(({ providers }) => {
    setProviders(providers);
  });

  const handlePageChange = (page: number) =>
    providersSearch(prevState => ({ ...prevState, page }));

  return (
    <ul>
      {providers &&
        providers.map(provider => (
          <li key={`provider_${provider._id}`}>
            <div>Name: {provider.name}</div>
          </li>
        ))}
      {pagination && (
        <Pagination data={pagination} onPageChange={handlePageChange} />
      )}
    </ul>
  );
};
