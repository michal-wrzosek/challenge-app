import React from 'react';

import { PaginationType } from '../../types/PaginationType';

export interface PaginationProps {
  data: PaginationType;
  onPageChange: (page: number) => any;
}

export const Pagination: React.FC<PaginationProps> = ({
  data: { page, totalPages, nextPage, prevPage },
  onPageChange,
}) => {
  return (
    <div>
      {prevPage && prevPage > 1 && <div onClick={() => onPageChange(1)}>1</div>}
      {prevPage && <div onClick={() => onPageChange(prevPage)}>{prevPage}</div>}
      <div onClick={() => onPageChange(page)}>{page}</div>
      {nextPage && <div onClick={() => onPageChange(nextPage)}>{nextPage}</div>}
      {nextPage && nextPage < totalPages && (
        <div onClick={() => onPageChange(totalPages)}>{totalPages}</div>
      )}
    </div>
  );
};
