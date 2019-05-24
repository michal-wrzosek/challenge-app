import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { times, identity } from 'ramda';

import { ProvidersContext } from '../../context/ProvidersContext/ProvidersContext';
import { useProvidersSubscription } from '../../hooks/useProvidersSubscription';
import { Pagination } from '../../components/Pagination/Pagination';
import {
  ProviderListItem,
  ProviderListItemSkeleton,
} from '../../components/ProviderListItem/ProviderListItem';
import {
  SearchStats,
  SearchStatsSkeleton,
} from '../../components/SearchStats/SearchStats';
import { Space } from '../../components/Space/Space';

const ListItem = styled.div``;

const List = styled.div`
  ${ListItem} {
    margin-bottom: ${themeGet('spaces.2')}em;
  }

  ${ListItem}:last-child {
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div``;

export const ProvidersListContainer = () => {
  const { providersSubject, providersSearch } = React.useContext(
    ProvidersContext
  );

  const {
    providers: initialProviders,
    pagination,
    isLoading: initialIsLoading,
  } = providersSubject.getValue();

  const [isLoading, setIsLoading] = React.useState(initialIsLoading);
  const [providers, setProviders] = React.useState(initialProviders);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useProvidersSubscription(({ providers, isLoading }) => {
    setIsLoading(isLoading);
    setProviders(providers);
  });

  const handlePageChange = (page: number) => {
    if (wrapperRef && wrapperRef.current) {
      const offset = window.pageYOffset;
      const { top } = wrapperRef.current.getBoundingClientRect();
      window.scrollTo({ top: offset + top, behavior: 'smooth' });
    }
    providersSearch(prevState => ({ ...prevState, page }));
  };

  if (isLoading) {
    return (
      <Wrapper>
        <SearchStatsSkeleton />
        <Space value={2} />
        <List>
          {times(identity, 6).map(i => (
            <ListItem key={i}>
              <ProviderListItemSkeleton />
            </ListItem>
          ))}
        </List>
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={wrapperRef}>
      {pagination && (
        <React.Fragment>
          <SearchStats data={pagination} />
          <Space value={2} />
        </React.Fragment>
      )}
      {providers && !!providers.length && (
        <List>
          {providers.map(provider => (
            <ListItem key={`provider_${provider._id}`}>
              <ProviderListItem provider={provider} />
            </ListItem>
          ))}
        </List>
      )}
      {pagination && pagination.totalDocs > 0 && (
        <React.Fragment>
          <Space value={2} />
          <Pagination data={pagination} onPageChange={handlePageChange} />
          <Space value={2} />
        </React.Fragment>
      )}
    </Wrapper>
  );
};
