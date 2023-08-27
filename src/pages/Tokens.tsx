import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { TokensUList } from '../components/tokens';
import { PaginationT } from '../components/atoms';
// redux
import { useSelector } from '../redux/store';
import {
  setPagesU,
  setTokensU,
  clearIntervalPagesU,
  clearIntervalTokensU,
  setIntervalIdPagesU,
  setIntervalIdTokensU,
  setPageU
} from '../redux/slices/sharedfilesuser';
// api
import { getTokensListByUser, getTokenPagesByUser } from '../api/sharedfiles';

export default function Tokens() {
  const { access_token } = useSelector((state) => state.session);
  const { pages, page } = useSelector((state) => state.sharedfilesuser);

  useEffect(() => {
    clearIntervalPagesU();
    async function PagesEffect() {
      const { pages } = await getTokenPagesByUser(access_token);
      setPagesU(pages);
    }
    PagesEffect();
    // @ts-ignore
    setIntervalIdPagesU(setInterval(PagesEffect, 10000));
  }, []);

  useEffect(() => {
    clearIntervalTokensU();
    async function TokensEffect() {
      const resp = await getTokensListByUser(page, access_token);
      setTokensU(resp);
    }
    TokensEffect();
    // @ts-ignore
    setIntervalIdTokensU(setInterval(TokensEffect, 5000));
  }, [page]);

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
