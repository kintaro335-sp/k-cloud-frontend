import { useEffect } from 'react';
import { Toolbar, Grid } from '@mui/material';
import { BackButton } from '../../components/atoms';
import { UsedSpacePie, UsedSpaceUserPie, UsedSpaceFileTPie } from '../../components/dashboard/stats';
// redux
import { useSelector } from '../../redux/store';
import { setTotal, setUsed, setUsedSpaceFiles, setUsedSpaceUsers } from '../../redux/slices/stats';
// api
import { getusedSpace, getUsedSpaceUser, getUsedSpaceByFileType } from '../../api/admin';

export default function Stats() {
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    async function getusedSpaceEffect() {
      const resultSpace = await getusedSpace(access_token, true);
      setTotal(resultSpace.total);
      setUsed(resultSpace.used);
      const resultSpaceUser = await getUsedSpaceUser(access_token);
      setUsedSpaceUsers(resultSpaceUser);
      const resultSpaceFile = await getUsedSpaceByFileType(access_token);
      setUsedSpaceFiles(resultSpaceFile);
    }
    getusedSpaceEffect();
  }, [access_token]);

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <UsedSpacePie />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UsedSpaceUserPie />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UsedSpaceFileTPie />
        </Grid>
      </Grid>
    </>
  );
}
