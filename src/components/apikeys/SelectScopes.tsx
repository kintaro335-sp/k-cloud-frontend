/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box, Chip, Button } from '@mui/material';
import { Icon } from '@iconify/react';

// contsnts
import { scopeList } from './constants';
// types
import { Scope } from '../../@types/apikeys';

interface SelectScopesProps {
  scopes: Scope[];
  onChange: (scopes: Scope[]) => void;
}

export default function SelectScopes({ onChange, scopes }: SelectScopesProps) {
  return <Box></Box>;
}
