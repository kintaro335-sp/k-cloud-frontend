import { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { RouteBar } from '../files/routebar';
// redux
import { useSelector } from '../../redux/store';
import { setPath, setContent } from '../../redux/slices/sharedfile';
// api
import { getContentToken, getContentTokenPath } from '../../api/sharedfiles';

export default function FolderExplorer() {
  const { path, content } = useSelector((state) => state.sharedfile);

  return <Box>

  </Box>;
}
