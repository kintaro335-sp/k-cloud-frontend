import { TableRow, TableCell } from '@mui/material';
import { User } from '../../../@types/admin';

export default function UserItem({ user }: { user: User }) {
  const { username, admin } = user;
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{admin ? 'si' : 'no'}</TableCell>
    </TableRow>
  );
}
