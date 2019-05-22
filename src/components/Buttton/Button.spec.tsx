import React from 'react';
import { shallow } from 'enzyme';

import { ButtonPrimary } from './Button';

describe('components/Button/ButtonPrimary', () => {
  it('renders', () => {
    const wrapper = shallow(<ButtonPrimary>Test</ButtonPrimary>);

    expect(wrapper.exists()).toBeTruthy();
  });
});
