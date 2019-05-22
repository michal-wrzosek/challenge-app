import React from 'react';
import { shallow, mount } from 'enzyme';

import { Space } from './Space';

describe('components/Space/Space', () => {
  it('renders', () => {
    const wrapper = shallow(<Space value={1} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('sets padding correctly', () => {
    const wrapper1 = mount(<Space value={1} />);
    const wrapper2 = mount(<Space value={3} />);

    expect(wrapper1).toHaveStyleRule('padding', '0.4em 0.4em 0 0');
    expect(wrapper2).toHaveStyleRule('padding', '1.2em 1.2em 0 0');
  });
});
