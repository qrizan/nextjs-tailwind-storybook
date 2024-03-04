import { IPagination } from './Pagination';

const base: IPagination = {
  currentPage: 3,
  total: 43,
  perPage: 10,
  onClickPrevious: "{() => function()}",
  onClickNext: "{() => function()}",
};

export const mockPaginationProps = {
  base,
};