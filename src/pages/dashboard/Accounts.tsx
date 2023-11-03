import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Card, CardHeader, Toolbar } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { BackButton } from '../../components/atoms';
// api
import { getAccounts } from '../../api/admin';
import { createNewSocket } from '../../api/websocket';
// redux
import { useSelector } from '../../redux/store';
import { setUsers } from '../../redux/slices/admin';

export default function Accounts() {
  const socketClient = useRef(createNewSocket());
  const { access_token } = useSelector((state) => state.session);
  const [userClock, setUserClock] = useState(false);

  useEffect(() => {
    async function getAccountsEffect() {
      getAccounts(access_token).then((result) => {
        setUsers(result);
      });
    }
    getAccountsEffect();
  }, [userClock]);

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('users-update', () => {
      setUserClock((val) => !val);
    });

    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

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
