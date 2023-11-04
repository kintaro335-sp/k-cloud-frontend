import { useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensUList } from '../components/tokens';
import { PaginationT } from '../components/atoms';
// redux
import { useSelector } from '../redux/store';
import { setPagesU, setTokensU, setPageU } from '../redux/slices/sharedfilesuser';
// api
import { getTokensListByUser, getTokenPagesByUser } from '../api/sharedfiles';
import { createNewSocket } from '../api/websocket';

export default function Tokens() {
  const { access_token } = useSelector((state) => state.session);
  const { pages, page } = useSelector((state) => state.sharedfilesuser);
  const socketClient = useRef(createNewSocket());

  useEffect(() => {
    async function PagesEffect() {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
    }
    PagesEffect();
  }, []);

  useEffect(() => {
    async function TokensEffect() {
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
    }
    TokensEffect();
  }, [page]);

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('token-change', async () => {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TokensUList />
        </Grid>
        <Grid item xs={12}>
          <PaginationT
            pages={pages}
            page={page}
            onChangePage={(_, value) => {
              setPageU(value);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
