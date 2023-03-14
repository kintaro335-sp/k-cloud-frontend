import { Pagination, PaginationItem } from '@mui/material';
import { useSelector } from '../../redux/store';

export default function PaginationT() {
  const { pages, page } = useSelector((state) => state.sharedfiles);
  return <Pagination page={page} defaultPage={1} count={pages} renderItem={(item) => <PaginationItem {...item} />} />;
}
