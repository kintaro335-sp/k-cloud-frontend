/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensUList } from '../components/tokens';
import { PaginationT } from '../components/atoms';
import Loading from './Loading';
// redux
import { useSelector } from '../redux/store';
import { setPagesU, setTokensU, setPageU } from '../redux/slices/sharedfilesuser';
// hooks
import useAuth from '../hooks/useAuth';
// api
import { getTokensListByUser, getTokenPagesByUser } from '../api/sharedfiles';

export default function Tokens() {
  const { socketClient } = useAuth();
  const { access_token } = useSelector((state) => state.session);
  const { pages, page } = useSelector((state) => state.sharedfilesuser);
  const [loading, setLoading] = useState(false);

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
    socketClient.on('token-change', async () => {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
    });
    return () => {
      socketClient.removeListener('token-change');
    }
  }, [page]);

  return (
    <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
      <Grid container spacing={3} sx={{ width: '100%' }}>
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
