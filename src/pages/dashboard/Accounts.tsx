import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, CardHeader, Toolbar } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { getAccounts } from '../../api/admin';
import { BackButton } from '../../components/atoms';
// redux
import { useSelector } from '../../redux/store';
import { setUsers, clearIntervalUser, setIntervalUser } from '../../redux/slices/admin';

export default function Accounts() {
  const { access_token } = useSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    clearIntervalUser();
    async function getAccountsEffect() {
      getAccounts(access_token).then((result) => {
        setUsers(result);
      });
    }
    getAccountsEffect();
    setIntervalUser(setInterval(getAccountsEffect, 1000));
  }, []);

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Card sx={{ mb: '5px' }}>
        <CardHeader title={<Typography variant="h4">Administracion de usuarios</Typography>} action={<NewUserForm />} />
      </Card>
      <Box>
        <UsersList />
      </Box>
    </>
  );
}
