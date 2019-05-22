import React from 'react';
import { shallow } from 'enzyme';

import { LogInScreen } from './LogInScreen';

describe('components/LogInScreen/LogInScreen', () => {
  it('renders', () => {
    const wrapper = shallow(<LogInScreen>Test</LogInScreen>);

    expect(wrapper.exists()).toBeTruthy();
  });
});
