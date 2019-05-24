import React from 'react';
import { shallow } from 'enzyme';

import { Pagination } from './Pagination';
import { PaginationType } from '../../types/PaginationType';

describe('components/Pagination/Pagination', () => {
  it('renders', () => {
    const pagination: PaginationType = {
      limit: 10,
      nextPage: 2,
      prevPage: null,
      page: 1,
      totalDocs: 300,
      totalPages: 30,
    };

    const onPageChange = () => {};
    const wrapper = shallow(
      <Pagination data={pagination} onPageChange={onPageChange} />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
