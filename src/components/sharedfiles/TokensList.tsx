/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useRef, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import TokenElement from './TokenElement';

// redux
import { useSelector } from '../../redux/store';

export default function TokensList() {
  const tokensContainerRef = useRef<HTMLDivElement>(null);
  const { tokens, page } = useSelector((state) => state.sharedfiles);
  
  useEffect(() => {
    tokensContainerRef.current?.scrollTo(0, 0);
  }, [page]);

  return (
    <Box ref={tokensContainerRef} sx={{ height: 'calc(100vh - 130px)', overflowY: 'scroll', overflowX: 'hidden' }}>
      <Grid container spacing={1}>
        {tokens.map((t, i) => (
          <Grid key={i} item xs={12} md={4} lg={3}>
            <TokenElement token={t} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
