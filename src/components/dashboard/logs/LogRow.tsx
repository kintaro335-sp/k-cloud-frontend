import { TableRow, TableCell } from '@mui/material';
import { SharedFileActivity } from '../../../@types/admin';
import { fullDateFormat } from '../../../utils/dateformat';

interface LogRowProps {
  info: SharedFileActivity;
}

export default function LogRow({ info }: LogRowProps) {
  const { date, user, tokenid, path, action, reason, status } = info;

  return (
    <TableRow>
      <TableCell>{fullDateFormat(date)}</TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{tokenid}</TableCell>
      <TableCell>{path}</TableCell>
      <TableCell>{action}</TableCell>
      <TableCell>{reason}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
}
