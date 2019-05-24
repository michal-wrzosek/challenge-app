import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import shallowequal from 'shallowequal';
import debounce from 'lodash.debounce';

import {
  ProvidersContext,
  ProvidersSearchState,
} from '../../context/ProvidersContext/ProvidersContext';
import { MinMaxFilter } from '../../components/MinMaxFilter/MinMaxFilter';
import { SelectFilter } from '../../components/SelectFilter/SelectFilter';
import { US_STATES } from '../../types/USStates';
import { useProvidersSubscription } from '../../hooks/useProvidersSubscription';
import { Space } from '../../components/Space/Space';

const Wrapper = styled.div`
  padding: ${themeGet('spaces.2')}em;
  border-radius: ${themeGet('filters.wrapper.borderRadius')}em;
  background: ${themeGet('filters.wrapper.bgColor')};
`;

export const ProvidersSearchContainer = () => {
  const { providersSearch, providersSubject } = React.useContext(
    ProvidersContext
  );

  const providersSearchThrottled = React.useRef(
    debounce(providersSearch, 1000)
  );

  const { searchState: initialSearchState } = providersSubject.getValue();

  const [searchState, setSearchState] = React.useState(initialSearchState);

  useProvidersSubscription(({ searchState: newSearchState, isLoading }) => {
    if (!isLoading && !shallowequal(newSearchState, searchState)) {
      setSearchState(newSearchState);
    }
  }, []);

  const handleFilterChange = (minProp: string, maxProp: string) => ({
    min,
    max,
  }: {
    min?: number | null;
    max?: number | null;
  }) => {
    const newSearchState: ProvidersSearchState = {
      ...searchState,
      ...(typeof min !== 'undefined' ? { [minProp]: min } : {}),
      ...(typeof max !== 'undefined' ? { [maxProp]: max } : {}),
    };

    setSearchState(newSearchState);

    providersSearchThrottled.current(() => newSearchState);
  };

  const stateOptions = [
    { label: 'No filter', value: undefined },
    ...Object.keys(US_STATES).map(state => ({
      label: state as US_STATES,
      value: state as US_STATES,
    })),
  ];

  const handleDischargesFilterChange = handleFilterChange(
    'min_discharges',
    'max_discharges'
  );
  const handleAvgCoveredChargesFilterChange = handleFilterChange(
    'min_average_covered_charges',
    'max_average_covered_charges'
  );
  const handleAvgMedicarePaymentsDischargesFilterChange = handleFilterChange(
    'min_average_medicare_payments',
    'max_average_medicare_payments'
  );
  const handleStateChange = (state: string | number | null) => {
    const newSearchState = {
      ...searchState,
      state: state as US_STATES,
    };

    setSearchState(newSearchState);
    providersSearchThrottled.current(() => newSearchState);
  };

  return (
    <Wrapper>
      <MinMaxFilter
        label="Discharges"
        valueMin={searchState.min_discharges}
        valueMax={searchState.max_discharges}
        onChange={handleDischargesFilterChange}
      />
      <Space value={4} />
      <MinMaxFilter
        label="Avg. Covered Charges"
        valueMin={searchState.min_average_covered_charges}
        valueMax={searchState.max_average_covered_charges}
        onChange={handleAvgCoveredChargesFilterChange}
      />
      <Space value={4} />
      <MinMaxFilter
        label="Avg. Medicare Payments"
        valueMin={searchState.min_average_medicare_payments}
        valueMax={searchState.max_average_medicare_payments}
        onChange={handleAvgMedicarePaymentsDischargesFilterChange}
      />
      <Space value={4} />
      <SelectFilter
        label="State"
        value={searchState.state}
        options={stateOptions}
        onChange={handleStateChange}
      />
    </Wrapper>
  );
};
