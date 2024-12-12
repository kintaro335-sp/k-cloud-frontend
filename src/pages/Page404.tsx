/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Button, useTheme } from '@mui/material';
import { Trans } from 'react-i18next';

export default function Page404() {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} sx={{ width: '38vw' }}>
        <Grid item xs={12}>
          <Typography variant="h1" sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
            404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
            <Trans i18nKey="pages.404.message">Page not found</Trans>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button component={Link} to="/" variant="contained" color="primary">
              <Trans i18nKey="pages.404.btn_go">Go back to home</Trans>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
