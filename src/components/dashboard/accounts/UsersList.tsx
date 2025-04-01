/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import UserItem from './UserItem';
import { Trans } from 'react-i18next';
// redux
import { useSelector } from '../../../redux/store';

export default function UsersList() {
  const { users } = useSelector((state) => state.admin);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><Trans i18nKey="pages.admin_users.label_username">Usuarios</Trans></TableCell> 
            <TableCell><Trans i18nKey="pages.admin_users.label_admin">Admin</Trans></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <UserItem key={u.id} user={u} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
