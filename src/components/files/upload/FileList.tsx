import { useState } from 'react';
import { List, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FileItem from './FileItem';
import { useSelector } from '../../../redux/store';

export default function FilesList() {
  const { filesDir, files } = useSelector((state) => state.files);

  return (
    <List>
      {filesDir.map((dir, i) => {
        if (files[dir] === null) return;
        return <FileItem key={i} path={dir} fileP={files[dir]} />;
      })}
    </List>
  );
}
