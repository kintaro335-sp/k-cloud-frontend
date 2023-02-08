import { TableRow, TableCell } from '@mui/material';
import MenuUser from './menu';
// types
import { User } from '../../../@types/admin';

export default function UserItem({ user }: { user: User }) {
  const { username, admin } = user;
  return (
    <TableRow>
      <TableCell>
        <MenuUser user={user} />
      </TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{admin ? 'si' : 'no'}</TableCell>
    </TableRow>
  );
}
