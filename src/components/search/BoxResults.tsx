/*
 * k-cloud-frontend
 * Copyright(c)  Kintaro Ponce
 * MIT Licensed
 */

import { Grid, Box } from '@mui/material';

import FileElement from './FileElement';
// redux
import { useSelector } from '../../redux/store';

export default function BoxResults() {
  const { list } = useSelector((state) => state.search);
  return (<Box sx={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 200px)' }}>
    <Grid container spacing={2}>
      {list.map((f, i) => (
        <Grid key={i} item xs={12} md={4} lg={3}>
          <FileElement info={f} />
        </Grid>
      ))}
    </Grid></Box>
  );
}
