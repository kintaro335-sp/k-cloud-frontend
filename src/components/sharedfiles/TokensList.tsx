/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { Box, Grid } from '@mui/material';
import TokenElement from './TokenElement';

// redux
import { useSelector } from '../../redux/store';

export default function TokensList() {
  const { tokens } = useSelector((state) => state.sharedfiles);
  return (
    <Box sx={{ height: 'calc(100vh - 20px)', overflowY: 'scroll', overflowX: 'hidden' }}>
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
