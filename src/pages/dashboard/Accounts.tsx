import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Card, CardHeader, Toolbar, CardContent } from '@mui/material';
import { UsersList, NewUserForm } from '../../components/dashboard/accounts';
import { BackButton } from '../../components/atoms';
// api
import { getAccounts, getOwner } from '../../api/admin';
import { createNewSocket } from '../../api/websocket';
// redux
import { useSelector } from '../../redux/store';
import { setUsers, setOwner } from '../../redux/slices/admin';

export default function Accounts() {
  const socketClient = useRef(createNewSocket());
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
        <CardContent>
          <Typography variant="h5">Lista de usuarios</Typography>
        </CardContent>
      </Card>
      <Box>
        <UsersList />
      </Box>
    </>
  );
}
