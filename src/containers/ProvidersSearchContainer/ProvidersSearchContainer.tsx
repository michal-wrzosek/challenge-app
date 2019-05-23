import React from 'react';
import { ButtonPrimary } from '../../components/Buttton/Button';
import { ProvidersContext } from '../../context/ProvidersContext/ProvidersContext';

export const ProvidersSearchContainer = () => {
  const { providersSearch } = React.useContext(ProvidersContext);

  return (
    <div>
      <ButtonPrimary onClick={() => providersSearch(() => ({}))}>
        Search
      </ButtonPrimary>
    </div>
  );
};
