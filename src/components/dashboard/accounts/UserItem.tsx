/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { TableRow, TableCell } from '@mui/material';
import MenuUser from './menu';
import { useSelector } from '../../../redux/store';
import { t } from 'i18next';
// types
import { User } from '../../../@types/admin';

export default function UserItem({ user }: { user: User }) {
  const { owner } = useSelector((state) => state.admin);
  const { id, username, admin } = user;

  return (
    <TableRow>
      <TableCell>
        <MenuUser user={user} />
      </TableCell>
      <TableCell>
        {username} {owner === id && t('pages.admin_users.label_is_owner')}
      </TableCell>
      <TableCell>{admin ? t('pages.admin_users.label_is_admin') : t('pages.admin_users.label_is_not_admin')}</TableCell>
    </TableRow>
  );
}
