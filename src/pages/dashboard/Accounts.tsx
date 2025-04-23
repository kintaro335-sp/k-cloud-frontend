/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Card, CardHeader, Toolbar, CardContent } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { BackButton } from '../../components/atoms';
import { Trans } from 'react-i18next';
// api
import { getAccounts, getOwner } from '../../api/admin';
// hooks
import useAuth from '../../hooks/useAuth';
// redux
import { useSelector } from '../../redux/store';
import { setUsers, setOwner } from '../../redux/slices/admin';

export default function Accounts() {
  const { socketClient } = useAuth();
  const { access_token } = useSelector((state) => state.session);
  const [userClock, setUserClock] = useState(false);

  useEffect(() => {
    async function getAccountsEffect() {
      getAccounts(access_token).then((result) => {
        setUsers(result);
      });
      getOwner(access_token).then((result) => {
        setOwner(result.id);
      });
    }
    getAccountsEffect();
  }, [userClock]);

  useEffect(() => {
    socketClient.on('users-update', () => {
      setUserClock((val) => !val);
    });
    return () => {
      socketClient.removeListener('users-update');
    };
  }, []);

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Card sx={{ mb: '5px' }}>
        <CardHeader title={<Typography variant="h4"><Trans i18nKey="pages.admin_users.title">Administracion de usuarios</Trans></Typography>} action={<NewUserForm />} />
        <CardContent>
          <Typography variant="h5"><Trans i18nKey="pages.admin_users.title_user_list">Lista de usuarios</Trans></Typography>
          <Box sx={{ mt: '10px' }}>
            <UsersList />
          </Box>
        </CardContent>
      </Card>
     
    </>
  );
}
