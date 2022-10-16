import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { UsersList } from '../../components/dashboard/accounts';
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
      <Typography variant="h4">Administracion de usuarios</Typography>
      <Box>
        <UsersList />
      </Box>
    </>
  );
}
