import React from 'react';

import { PaginationType } from '../../types/PaginationType';
import styled, { css } from 'styled-components';
import { ButtonPrimary } from '../Buttton/Button';
import { themeGet } from 'styled-system';

export interface PaginationProps {
  data: PaginationType;
  onPageChange: (page: number) => any;
}

const Button = styled(ButtonPrimary)<{ isActive?: boolean }>`
  display: inline-block;
  margin: 0 0.1em;
  width: initial;

  ${({ isActive }) =>
    isActive &&
    css`
      padding-left: ${themeGet('spaces.2')}em;
      padding-right: ${themeGet('spaces.2')}em;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Pagination: React.FC<PaginationProps> = ({
  data: { page, totalPages, nextPage, prevPage },
  onPageChange,
}) => {
  return (
    <Wrapper>
      {prevPage && prevPage > 1 && (
        <Button onClick={() => onPageChange(1)}>1</Button>
      )}
      {prevPage && (
        <Button onClick={() => onPageChange(prevPage)}>{prevPage}</Button>
      )}
      <Button isActive={true} onClick={() => onPageChange(page)}>
        {page}
      </Button>
      {nextPage && (
        <Button onClick={() => onPageChange(nextPage)}>{nextPage}</Button>
      )}
      {nextPage && nextPage < totalPages && (
        <Button onClick={() => onPageChange(totalPages)}>{totalPages}</Button>
      )}
    </Wrapper>
  );
};
