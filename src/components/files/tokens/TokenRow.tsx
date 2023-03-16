import { TableRow, TableCell } from '@mui/material';
import TokenActions from './TokenActions';
import { TokenElement } from '../../../@types/sharedfiles';
import moment from 'moment';
interface TokenRowProps {
  token: TokenElement;
}

export default function TokenRow({ token }: TokenRowProps) {
  const { id, expires, expire } = token;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{expire ? 'si' : 'no'}</TableCell>
      <TableCell>{expire ? moment(expires).format('DD-MM-YYYY hh:mm a') : '-'}</TableCell>
      <TableCell>
        <TokenActions id={id} />
      </TableCell>
    </TableRow>
  );
}
