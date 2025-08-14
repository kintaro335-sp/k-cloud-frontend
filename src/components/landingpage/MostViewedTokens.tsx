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
import { Loading } from '../../pages';
// api
import { getMostViewedTokens } from '../../api/sharedfiles';
// types
import { TokenElement } from '../../@types/sharedfiles';

export default function MostViewedTokens() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenElement[]>([]);

  useEffect(() => {
    setLoading(true);
    getMostViewedTokens().then((res) => {
      setTokens(res);
      setLoading(false);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        <Trans i18nKey="pages.home.most_viewed">Tokens con mas vistas</Trans>
      </Typography>
      <Stack spacing={2} direction="row" sx={{ padding: '10px', maxWidth: '95vw', overflowX: 'auto' }}>
        {loading && <Loading height="350px" width="90vw" />}
        {!loading && tokens.map((token) => <TokenItem key={token.id} token={token} />)}
      </Stack>
    </Box>
  );
}
