import React from 'react';
import { shallow } from 'enzyme';

import { ProviderListItem } from './ProviderListItem';
import { ProviderType } from '../../types/ProviderType';

describe('components/ProviderListItem/ProviderListItem', () => {
  it('renders', () => {
    const provider: ProviderType = {
      _id: 'some_value',
      providerId: 'some_value',
      name: 'some_value',
      street: 'some_value',
      city: 'some_value',
      state: 'some_value',
      zipcode: 'some_value',
      hospitalReferralRegionDesc: 'some_value',
      totalDischarges: 10,
      avgCoveredCharges: 10,
      avgTotalPayments: 10,
      avgMedicarePayments: 10,
      drgDefinition: 'some_value',
    };

    const wrapper = shallow(<ProviderListItem provider={provider} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
