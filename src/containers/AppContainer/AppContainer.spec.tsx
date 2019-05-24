import React from 'react';
import { mount } from 'enzyme';

import { AppContainer } from './AppContainer';

describe('containers/AppContainer/AppContainer', () => {
  it('renders', () => {
    const wrapper = mount(<AppContainer />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
