import { TableRow, TableCell } from '@mui/material';
import { LogR } from '../../../@types/admin';
import { fullDateFormat } from '../../../utils/dateformat';

interface LogRowProps {
  info: LogR;
}

export default function LogRow({ info }: LogRowProps) {
  const { date, method, route, statusCode } = info;

  return (
    <TableRow>
      <TableCell>{fullDateFormat(date)}</TableCell>
      <TableCell>{route}</TableCell>
      <TableCell>{method}</TableCell>
      <TableCell>{statusCode}</TableCell>
    </TableRow>
  );
}
