/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
// components
import { TokenElement } from '../sharedfiles';
// types
import { TokenElement as TokenElementT } from '../../@types/sharedfiles';

export default function TokenItem({ token }: { token: TokenElementT }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: { xs: '65vw', md: '44vw', lg: '33vw' } }}>
      <TokenElement token={token} />
    </Box>
  )  
}
