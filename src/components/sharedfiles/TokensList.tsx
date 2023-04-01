import { Box, Grid } from '@mui/material';
import TokenElement from './TokenElement';

// redux
import { useSelector } from '../../redux/store';

export default function TokensList() {
  const { tokens } = useSelector((state) => state.sharedfiles);
  return (
    <Box sx={{ width: '100vw' }}>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {tokens.map((t, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <TokenElement token={t} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
