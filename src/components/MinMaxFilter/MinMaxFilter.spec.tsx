import React from 'react';
import { shallow } from 'enzyme';

import { MinMaxFilter } from './MinMaxFilter';

describe('components/MinMaxFilter/MinMaxFilter', () => {
  it('renders', () => {
    const onChange = () => {};
    const wrapper = shallow(
      <MinMaxFilter
        label="some_label"
        valueMin={10}
        valueMax={90}
        onChange={onChange}
      />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
