/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState, useEffect } from 'react';
// components
import { Box, Stack, Typography } from '@mui/material';
import { Trans } from 'react-i18next';
// components
import TokenItem from './TokenItem';
// api
import { getRecentViewedTokens } from '../../api/sharedfiles';
// types
import { TokenElement } from '../../@types/sharedfiles';

export default function RecentViewedTokens() {
  const [tokens, setTokens] = useState<TokenElement[]>([]);

  useEffect(() => {
    getRecentViewedTokens().then((res) => {
      setTokens(res);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        <Trans i18nKey="pages.home.most_recent">Tokens mas recientes</Trans>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ padding: '10px', maxWidth: '95vw', overflowX: 'auto' }}>
        {tokens.map((token) => (
          <TokenItem key={token.id} token={token} />
        ))}
      </Stack>
    </Box>
  );
}

