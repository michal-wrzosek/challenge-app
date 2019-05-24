import React from 'react';
import { shallow } from 'enzyme';

import { SearchStats } from './SearchStats';
import { PaginationType } from '../../types/PaginationType';

describe('components/SearchStats/SearchStats', () => {
  it('renders', () => {
    const pagination: PaginationType = {
      limit: 10,
      nextPage: 2,
      prevPage: null,
      page: 1,
      totalDocs: 300,
      totalPages: 30,
    };

    const wrapper = shallow(<SearchStats data={pagination} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
