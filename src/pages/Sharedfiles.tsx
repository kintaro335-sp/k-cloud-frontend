import { useEffect, useRef, useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { TokensList } from '../components/sharedfiles';
import { PaginationT } from '../components/atoms';
// redux
import { useSelector } from '../redux/store';
import { setPages, setTokens, setPage } from '../redux/slices/sharedfiles';
// hooks
import useAuth from '../hooks/useAuth';
// api
import { getTokensList, getPagesTokens } from '../api/sharedfiles';
// import { isAxiosError } from 'axios';

export default function ShareFiles() {
  const { socketClient } = useAuth();
  const { access_token } = useSelector((state) => state.session);
  const { page, pages } = useSelector((state) => state.sharedfiles);


  const PagesEffect = useCallback(async () => {
    const { pages } = await getPagesTokens();
    setPages(pages);
  }, [pages]);

  useEffect(() => {
    PagesEffect();
  }, [PagesEffect]);


  const TokensEffect = useCallback(async () => {
    const resp = await getTokensList(page);
    setTokens(resp);
  }, [page]);

  useEffect(() => {
    TokensEffect();
  }, [TokensEffect]);

  useEffect(() => {
    socketClient.removeListener('token-change');
    socketClient.on('token-change', () => {
      PagesEffect();
      TokensEffect();
    });
  }, [access_token]);  


  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TokensList />
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
