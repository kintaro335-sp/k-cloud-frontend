import { Pagination, PaginationItem } from '@mui/material';

interface PaginationTProps {
  pages: number;
  page: number;
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationT({ pages, page, onChangePage }: PaginationTProps) {
  return (
    <>
      {pages !== 1 && (
        <Pagination
          onChange={onChangePage}
          page={page}
          defaultPage={1}
          count={pages}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      )}
    </>
  );
}
