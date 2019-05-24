import React from 'react';
import { shallow } from 'enzyme';

import { PlaceholderSkeleton } from './PlaceholderSkeleton';

describe('components/PlaceholderSkeleton/PlaceholderSkeleton', () => {
  it('renders', () => {
    const wrapper = shallow(<PlaceholderSkeleton />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
