/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// components
import { Box, Typography, Button, Stack } from '@mui/material';
import { MostViewedTokens, RecentViewedTokens } from '../components/landingpage';
// api
import { getIsConfigured } from '../api/setup';

export default function LandingPage() {
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    getIsConfigured().then((result) => {
      setConfigured(result.configured);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack>
        <Typography variant="h3" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          K Cloud
        </Typography>
        {!configured && (
          <Button component={Link} to="/setup" variant="contained" color="primary">
            Crear primer usuario
          </Button>
        )}
        {configured && <MostViewedTokens />}
        {configured && <RecentViewedTokens />}
      </Stack>
    </Box>
  );
}
