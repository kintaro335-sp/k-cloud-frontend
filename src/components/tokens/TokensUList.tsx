import { Box, Grid } from '@mui/material';
import TokenUElement from './TokenUElement';

import { useSelector } from '../../redux/store';

export default function TokensUList() {
  const { tokens } = useSelector((state) => state.sharedfilesuser);

  return (
    <Box sx={{ width: '100vw' }}>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {tokens.map((t, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <TokenUElement token={t} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
