import React from 'react';
import { shallow } from 'enzyme';

import { TextInput } from './TextInput';

describe('components/TextInput/TextInput', () => {
  it('renders', () => {
    const wrapper = shallow(<TextInput type="text" name="text" value="test" />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
