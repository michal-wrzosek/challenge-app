import React from 'react';
import { ProvidersProvider } from '../../context/ProvidersContext/ProvidersContext';
import { ProvidersListContainer } from '../ProvidersListContainer/ProvidersListContainer';
import { ProvidersSearchContainer } from '../ProvidersSearchContainer/ProvidersSearchContainer';
import { Space } from '../../components/Space/Space';

export const ProvidersPageContainer = () => (
  <ProvidersProvider>
    <ProvidersSearchContainer />
    <Space value={4} />
    <ProvidersListContainer />
  </ProvidersProvider>
);
