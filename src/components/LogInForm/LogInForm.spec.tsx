import React from 'react';
import { shallow } from 'enzyme';

import { LogInForm } from './LogInForm';

describe('components/LogInForm/LogInForm', () => {
  it('renders', () => {
    const authenticate = () => {};
    const wrapper = shallow(
      <LogInForm isLoading={false} authenticate={authenticate} />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
