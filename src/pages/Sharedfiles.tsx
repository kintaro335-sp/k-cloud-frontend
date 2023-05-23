import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensList } from '../components/sharedfiles';
import { PaginationT } from '../components/atoms';
// redux
import { useSelector } from '../redux/store';
import {
  setPages,
  setTokens,
  clearIntervalPages,
  clearIntervalTokens,
  setIntervalIdPages,
  setIntervalIdTokens,
  setPage
} from '../redux/slices/sharedfiles';
// api
import { getTokensList, getPagesTokens } from '../api/sharedfiles';
// import { isAxiosError } from 'axios';

export default function ShareFiles() {
  const { page, pages } = useSelector((state) => state.sharedfiles);

  useEffect(() => {
    clearIntervalPages();
    async function PagesEffect() {
      const { pages } = await getPagesTokens();
      setPages(pages);
    }
    PagesEffect();
    // @ts-ignore
    setIntervalIdPages(setInterval(PagesEffect, 10000));
  }, []);

  useEffect(() => {
    clearIntervalTokens();
    async function TokensEffect() {
      const resp = await getTokensList(page);
      setTokens(resp);
    }
    TokensEffect();
    // @ts-ignore
    setIntervalIdTokens(setInterval(TokensEffect, 5000));
  }, [page]);

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
