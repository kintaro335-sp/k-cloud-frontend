import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensList, PaginationT } from '../components/sharedfiles';
// redux
import { useSelector } from '../redux/store';
import {
  setPages,
  setTokens,
  clearIntervalPages,
  clearIntervalTokens,
  setIntervalIdPages,
  setIntervalIdTokens
} from '../redux/slices/sharedfiles';
import { setInfo } from '../redux/slices/sharedfile';
// api
import { getTokensList, getPagesTokens } from '../api/sharedfiles';
// import { isAxiosError } from 'axios';

export default function ShareFiles() {
  const { page } = useSelector((state) => state.sharedfiles);

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

  useEffect(() => {
    setInfo(null);
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TokensList />
        </Grid>
        <Grid item xs={12}>
          <PaginationT />
        </Grid>
      </Grid>
    </Box>
  );
}
