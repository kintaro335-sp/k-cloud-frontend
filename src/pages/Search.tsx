/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { Grid } from '@mui/material';
import { BoxResults, SearchBar } from '../components/search';


export default function SearchPage() {
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <SearchBar />
    </Grid>
    <Grid item xs={12}>
      <BoxResults />
    </Grid>
  </Grid>;
}
