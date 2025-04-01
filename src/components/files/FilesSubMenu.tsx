/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Stack } from '@mui/material';
import SearchButton from './SearchButton';
import UploadFile from './UploadSingleFile';
import AddFolder from './AddFolder';

export default function FilesSubMenu() {
  return (
    <Stack direction="row" spacing={2}>
      <UploadFile />
      <AddFolder />
    </Stack>
  );
}
