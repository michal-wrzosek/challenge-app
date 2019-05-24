import React from 'react';
import { shallow } from 'enzyme';

import { PageLayout } from './PageLayout';

describe('components/PageLayout/PageLayout', () => {
  it('renders', () => {
    const wrapper = shallow(<PageLayout>Test</PageLayout>);

    expect(wrapper.exists()).toBeTruthy();
  });
});
