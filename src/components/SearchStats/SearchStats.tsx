import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import { PaginationType } from '../../types/PaginationType';

export interface SearchStatsProps {
  data: PaginationType;
}

const Wrapper = styled.div`
  padding: 0 ${themeGet('spaces.1')}em;
`;

export const SearchStats: React.FC<SearchStatsProps> = ({
  data: { totalDocs, page, totalPages },
}) => (
  <Wrapper>
    Found {totalDocs} records. Page {page}/{totalPages}
  </Wrapper>
);

export const SearchStatsSkeleton = () => <Wrapper>Loading...</Wrapper>;
