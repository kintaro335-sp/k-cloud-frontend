import { useEffect, useRef } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
  Typography,
  Button
} from '@mui/material';
import TokenRow from './TokenRow';
import { useSnackbar } from 'notistack';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { setTokens } from '../../../redux/slices/session';
// api
import { getTokensByPath, deleteTokensByPath } from '../../../api/sharedfiles';
import { createNewSocket } from '../../../api/websocket';

interface TokensTableProps {
  url: string;
}

export default function TokensTable({ url }: TokensTableProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const socketClient = useRef(createNewSocket(access_token));
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function getTokensEffect() {
      const tokensRes = await getTokensByPath(url, access_token);
      dispatch(setTokens(tokensRes));
    }
    getTokensEffect();
  }, [access_token]);

  useEffect(() => {
    const newSocket = createNewSocket(access_token);
    newSocket.on('token-change', async (data) => {
      if (data.path !== url) {
        return;
      }
      const tokensRes = await getTokensByPath(url, access_token);
      dispatch(setTokens(tokensRes));
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  const onClickRemoveTokens = async () => {
    if (window.confirm('Desea dejar de compartir este archivo?')) {
      await deleteTokensByPath(url, access_token);
      enqueueSnackbar('se dejó de compartir', { variant: 'success' });
    }
  };

  return (
    <Box>
      <Typography variant="h6">Tokens</Typography>
      <Button variant="contained" onClick={onClickRemoveTokens}>
        Dejar de Compartir
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>expira</TableCell>
              <TableCell>publico</TableCell>
              <TableCell>expiración</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((t, i) => (
              <TokenRow key={i} token={t} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
