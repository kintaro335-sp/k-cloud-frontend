/*
 * k-cloud-frontend
 * Copyright(c) 2022-2024 Kintaro Ponce
 * MIT Licensed
 */

import { Button } from '@mui/material';

import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-material-symbols/search';

export default function SearchButton() {
  return (
    <>
      <Button startIcon={<Icon icon={searchIcon} width="20px" height="20px" />} variant="contained">
        Buscar
      </Button>
    </>
  );
}
