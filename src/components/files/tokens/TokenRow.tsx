import { TableRow, TableCell, Typography, Link } from '@mui/material';
import TokenActions from './TokenActions';
import { TokenElement } from '../../../@types/sharedfiles';
import { fullDateFormat } from '../../../utils/dateformat';
interface TokenRowProps {
  token: TokenElement;
}

export default function TokenRow({ token }: TokenRowProps) {
  const { id, expires, expire, publict } = token;
  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle1">
          <Link target="_blank" href={`${window.origin}/shared-files/id/${id}`}>
            {id}
          </Link>
        </Typography>
      </TableCell>
      <TableCell>{expire ? 'si' : 'no'}</TableCell>
      <TableCell>{publict ? 'si' : 'no'}</TableCell>
      <TableCell>{expire ? fullDateFormat(expires) : '-'}</TableCell>
      <TableCell>
        <TokenActions id={id} token={token} />
      </TableCell>
    </TableRow>
  );
}
