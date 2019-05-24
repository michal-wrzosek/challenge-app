import React from 'react';
import { shallow } from 'enzyme';

import { SelectFilter } from './SelectFilter';

describe('components/SelectFilter/SelectFilter', () => {
  it('renders', () => {
    const options = [
      { value: undefined, label: 'No selection' },
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ];

    const onChange = () => {};
    const wrapper = shallow(
      <SelectFilter
        label="Some label"
        options={options}
        value={undefined}
        onChange={onChange}
      />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
