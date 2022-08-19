import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';

export default function Page404() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} sx={{ width: '38vw' }}>
        <Grid item xs={12}>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Page not found
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button component={Link} to="/" variant="contained" color="primary">
              Go back to home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
