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
      <TableCell>{expire}</TableCell>
      <TableCell>{expires}</TableCell>
      <TableCell>
        <TokenActions id={id} />
      </TableCell>
    </TableRow>
  );
}
