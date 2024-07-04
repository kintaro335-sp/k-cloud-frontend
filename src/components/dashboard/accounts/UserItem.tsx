import { TableRow, TableCell } from '@mui/material';
import MenuUser from './menu';
import { useSelector } from '../../../redux/store';
// types
import { User } from '../../../@types/admin';

export default function UserItem({ user }: { user: User }) {
  const { owner } = useSelector((state) => state.admin);
  const { id, username, admin } = user;

  if (id === owner) return <></>;

  return (
    <TableRow>
      <TableCell>
        <MenuUser user={user} />
      </TableCell>
      <TableCell>
        {username} {owner === id && '(owner)'}
      </TableCell>
      <TableCell>{admin ? 'si' : 'no'}</TableCell>
    </TableRow>
  );
}
