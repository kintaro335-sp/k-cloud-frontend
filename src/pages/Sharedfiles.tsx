/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useRef, useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { TokensList } from '../components/sharedfiles';
import { PaginationT } from '../components/atoms';
import Loading from './Loading';
// redux
import { useSelector } from '../redux/store';
import { setPages, setTokens, setPage, setLoading } from '../redux/slices/sharedfiles';
// hooks
import useAuth from '../hooks/useAuth';
// api
import { getTokensList, getPagesTokens } from '../api/sharedfiles';
// import { isAxiosError } from 'axios';

export default function ShareFiles() {
  const { socketClient } = useAuth();
  const { access_token } = useSelector((state) => state.session);
  const { page, pages, loading } = useSelector((state) => state.sharedfiles);


  const PagesEffect = useCallback(async () => {
    const { pages } = await getPagesTokens();
    setPages(pages);
  }, [pages]);

  useEffect(() => {
    PagesEffect();
  }, [PagesEffect]);


  const TokensEffect = useCallback(async () => {
    setLoading(true);
    const resp = await getTokensList(page);
    setTokens(resp);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    TokensEffect();
  }, [TokensEffect]);

  useEffect(() => {
    socketClient.on('token-change', () => {
      PagesEffect();
      TokensEffect();
    });

    return () => {
      socketClient.removeListener('token-change');
    };
  }, [access_token]);  


  return (
    <Box sx={{ width: '100%', padding: 0, margin: 0 }}>
      <Grid container spacing={3} sx={{ width: '100vw' }}>
        <Grid item xs={12}>
          {loading ? <Loading /> : <TokensList />}
        </Grid>
        <Grid item xs={12}>
          <PaginationT
            pages={pages}
            page={page}
            onChangePage={(_, value) => {
              setPage(value);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
