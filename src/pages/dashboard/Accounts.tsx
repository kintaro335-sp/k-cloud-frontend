import { useEffect } from 'react';
import { Typography, Box, Card, CardHeader } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { getAccounts } from '../../api/admin';
// redux
import {  useSelector } from '../../redux/store';
import { setUsers, clearIntervalUser, setIntervalUser } from '../../redux/slices/admin';

export default function Accounts() {
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    clearIntervalUser();
    async function getAccountsEffect() {
      getAccounts(access_token).then((result) => {
        setUsers(result)
      });
    }
    getAccountsEffect();
    setIntervalUser(setInterval(getAccountsEffect, 1000))
  }, []);

  return (
    <>
      <Card sx={{ mb: '5px' }}>
        <CardHeader title={<Typography variant="h4">Administracion de usuarios</Typography>} action={<NewUserForm />} />
      </Card>
      <Box>
        <UsersList />
      </Box>
    </>
  );
}
