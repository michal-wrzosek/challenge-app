import React from 'react';
import { ProvidersProvider } from '../../context/ProvidersContext/ProvidersContext';
import { ProvidersListContainer } from '../ProvidersListContainer/ProvidersListContainer';
import { ProvidersSearchContainer } from '../ProvidersSearchContainer/ProvidersSearchContainer';

export const ProvidersPageContainer = () => (
  <ProvidersProvider>
    <ProvidersSearchContainer />
    <ProvidersListContainer />
  </ProvidersProvider>
);
