import { TableRow, TableCell } from '@mui/material';
import { LogR } from '../../../@types/admin';
import moment from 'moment';

interface LogRowProps {
  info: LogR;
}

export default function LogRow({ info }: LogRowProps) {
  const { date, method, route, statusCode } = info;

  return (
    <TableRow>
      <TableCell>{moment(date).format('YYYY-MM-DD h:mm:ss A')}</TableCell>
      <TableCell>{route}</TableCell>
      <TableCell>{method}</TableCell>
      <TableCell>{statusCode}</TableCell>
    </TableRow>
  );
}
