import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';
import shallowequal from 'shallowequal';
import debounce from 'lodash.debounce';

import { ProvidersContext } from '../../context/ProvidersContext/ProvidersContext';
import { MinMaxFilter } from '../../components/MinMaxFilter/MinMaxFilter';
import { SelectFilter } from '../../components/SelectFilter/SelectFilter';
import { US_STATES } from '../../types/USStates';
import { useProvidersSubscription } from '../../hooks/useProvidersSubscription';
import { Space } from '../../components/Space/Space';
import { ProvidersSearchState } from '../../context/ProvidersContext/types';
import { media } from '../../styles/media';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${themeGet('spaces.2')}em;
  border-radius: ${themeGet('filters.wrapper.borderRadius')}em;
  background: ${themeGet('filters.wrapper.bgColor')};

  ${media.sm`
    flex-direction: row;

    ${Column} {
      margin-right: ${themeGet('spaces.1')}em;
    }

    ${Column}:last-child {
      margin-right: 0;
    }
  `};
`;

export const priceToInteger = (price: number | null | undefined) => {
  if (typeof price === 'undefined') return undefined;
  return price !== null ? Math.round(price * 100) : null;
};

export const integerToPrice = (integer: number | null | undefined) => {
  if (typeof integer === 'undefined') return undefined;
  return integer !== null
    ? Number((Math.round(integer) / 100).toFixed(2))
    : null;
};

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

  const handlePriceFilterChange = (minProp: string, maxProp: string) => ({
    min,
    max,
  }: {
    min?: number | null;
    max?: number | null;
  }) =>
    handleFilterChange(minProp, maxProp)({
      min: priceToInteger(min),
      max: priceToInteger(max),
    });

  const handleDischargesFilterChange = handleFilterChange(
    'min_discharges',
    'max_discharges'
  );
  const handleAvgCoveredChargesFilterChange = handlePriceFilterChange(
    'min_average_covered_charges',
    'max_average_covered_charges'
  );
  const handleAvgMedicarePaymentsDischargesFilterChange = handlePriceFilterChange(
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
      <Column>
        <MinMaxFilter
          label="Discharges ($)"
          valueMin={searchState.min_discharges}
          valueMax={searchState.max_discharges}
          onChange={handleDischargesFilterChange}
        />
        <Space value={4} />
        <MinMaxFilter
          label="Avg. Covered Charges ($)"
          valueMin={integerToPrice(searchState.min_average_covered_charges)}
          valueMax={integerToPrice(searchState.max_average_covered_charges)}
          onChange={handleAvgCoveredChargesFilterChange}
        />
        <Space value={[4, 0]} />
      </Column>
      <Column>
        <MinMaxFilter
          label="Avg. Medicare Payments ($)"
          valueMin={integerToPrice(searchState.min_average_medicare_payments)}
          valueMax={integerToPrice(searchState.max_average_medicare_payments)}
          onChange={handleAvgMedicarePaymentsDischargesFilterChange}
        />
        <Space value={4} />
        <SelectFilter
          label="State"
          value={searchState.state}
          options={stateOptions}
          onChange={handleStateChange}
        />
      </Column>
    </Wrapper>
  );
};
