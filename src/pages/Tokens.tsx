import { useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensUList } from '../components/tokens';
import { PaginationT } from '../components/atoms';
import Loading from './Loading';
// redux
import { useSelector } from '../redux/store';
import { setPagesU, setTokensU, setPageU } from '../redux/slices/sharedfilesuser';
// api
import { getTokensListByUser, getTokenPagesByUser } from '../api/sharedfiles';
import { createNewSocket } from '../api/websocket';

export default function Tokens() {
  const { access_token } = useSelector((state) => state.session);
  const { pages, page } = useSelector((state) => state.sharedfilesuser);
  const [loading, setLoading] = useState(false);
  const socketClient = useRef(createNewSocket(access_token));

  useEffect(() => {
    async function PagesEffect() {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
    }
    PagesEffect();
  }, []);

  useEffect(() => {
    async function TokensEffect() {
      setLoading(true);
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
      setLoading(false);
    }
    TokensEffect();
  }, [page]);

  useEffect(() => {
    const newSocket = createNewSocket(access_token);
    newSocket.removeAllListeners()
    newSocket.on('token-change', async () => {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token, page]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? <Loading  /> : <TokensUList />}
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
