import { useEffect } from 'react';
import { Typography, Box, Card, CardHeader } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { getAccounts } from '../../api/admin';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setUsers } from '../../redux/slices/admin';

export default function Accounts() {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    getAccounts(access_token).then((result) => {
      dispatch(setUsers(result));
    });
  });

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
