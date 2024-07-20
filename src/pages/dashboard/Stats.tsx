import { useEffect, useState, useRef } from 'react';
import { Toolbar, Grid, Typography, RadioGroup, FormControlLabel, Radio, Box, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { BackButton } from '../../components/atoms';
import { UsedSpacePie, UsedSpaceUserPie, UsedSpaceFileTPie } from '../../components/dashboard/stats';
import { LineChartGeneral } from '../../components/dashboard/stats/logs';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../redux/store';
import {
  setTotal,
  setUsed,
  setUsedSpaceFiles,
  setUsedSpaceUsers,
  setActivityActions,
  setActivityReason,
  setActivityStatus,
  setMemoryUsageH
} from '../../redux/slices/stats';
// api
import {
  getusedSpace,
  getUsedSpaceUser,
  getUsedSpaceByFileType,
  getLineChartData,
  getMemoryUsageData,
  updateUsersTrees
} from '../../api/admin';
// types
import { TIMEOPTION, GROUPFILTER } from '../../@types/stats';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import { bytesFormat } from '../../utils/files';
import { SerieLineChart } from '../../@types/stats';

export default function Stats() {
  const { socketClient } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { access_token } = useSelector((state) => state.session);
  const { activityActions, activityReason, activityStatus, memoryUsageH } = useSelector((state) => state.stats);
  const [updating, setUpdating] = useState(false);
  const [time, setTime] = useState<TIMEOPTION>(TIMEOPTION.TODAY);
  const [tabValue, setTabValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newV: string) => {
    setTabValue(newV);
  };

  const processdata = (arr: SerieLineChart | undefined): SerieLineChart => {
    if (arr === undefined) {
      return { id: '', data: [] };
    }
    return arr;
  };

  const total = processdata(memoryUsageH[0]);
  const buffer_info = processdata(memoryUsageH[1]);

  async function getusedSpaceEffect() {
    const resultSpace = await getusedSpace(access_token, true);
    setTotal(resultSpace.total);
    setUsed(resultSpace.used);
    const resultSpaceUser = await getUsedSpaceUser(access_token);
    setUsedSpaceUsers(resultSpaceUser);
    const resultSpaceFile = await getUsedSpaceByFileType(access_token);
    setUsedSpaceFiles(resultSpaceFile);
  }

  useEffect(() => {
    getusedSpaceEffect();
  }, [access_token]);

  async function getActivityStats() {
    // methods
    const dataMethods = await getLineChartData(GROUPFILTER.ACTION, time, access_token);
    setActivityActions(dataMethods);
    // methods
    const dataStatusCode = await getLineChartData(GROUPFILTER.STATUS, time, access_token);
    setActivityStatus(dataStatusCode);
    // methods
    const dataRoute = await getLineChartData(GROUPFILTER.RESAON, time, access_token);
    setActivityReason(dataRoute);
  }

  useEffect(() => {
    getActivityStats();
  }, [access_token, time]);

  async function getMemoryUsageHEffect() {
    const data = await getMemoryUsageData(access_token);
    setMemoryUsageH(data);
  }

  useEffect(() => {
    getMemoryUsageHEffect();
  }, [access_token]);

  useEffect(() => {
    socketClient.removeListener('memory-usage-update');
    socketClient.removeListener('stats-update');
    socketClient.on('memory-usage-update', () => {
      getMemoryUsageHEffect();
    });
    socketClient.on('stats-update', () => {
      getActivityStats();
    });
  }, []);

  const handleUpdate = () => {
    setUpdating(true);
    enqueueSnackbar('Actualizando...', { variant: 'info' });
    updateUsersTrees(access_token).then((resp) => {
      getusedSpaceEffect();
      setUpdating(false);
      enqueueSnackbar(resp.message, { variant: 'success' });
    }).catch((err) => {
      setUpdating(false);
    })
  };

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <TabContext value={tabValue}>
        <TabList onChange={handleChange}>
          <Tab sx={{ color: theme.palette.text.primary }} label="Use de Espacio" value="0" />
          <Tab sx={{ color: theme.palette.text.primary }} label="Actividad" value="1" />
          <Tab sx={{ color: theme.palette.text.primary }} label="Use De Memoria" value="2" />
        </TabList>
        <Box>
          <TabPanel value="0">
            <Toolbar>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={updating}
                sx={{ mr: 2 }}
              >
                {updating ? 'Actualizando...' : 'Actualizar'}
              </Button>
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
          </TabPanel>
          <TabPanel value="1">
            <Toolbar>
              <RadioGroup
                row
                value={time}
                onChange={(_, val) => {
                  //@ts-ignore
                  setTime(val);
                }}
              >
                <FormControlLabel
                  value={TIMEOPTION.TODAY}
                  control={<Radio />}
                  label={<Box sx={{ color: theme.palette.text.primary }}>hoy</Box>}
                />
                <FormControlLabel
                  value={TIMEOPTION.LAST7DAYS}
                  control={<Radio />}
                  label={<Box sx={{ color: theme.palette.text.primary }}>ultimos 7 dias</Box>}
                />
                <FormControlLabel
                  value={TIMEOPTION.THISMONTH}
                  control={<Radio />}
                  label={<Box sx={{ color: theme.palette.text.primary }}>este mes</Box>}
                />
                <FormControlLabel
                  value={TIMEOPTION.LAST30DAYS}
                  control={<Radio />}
                  label={<Box sx={{ color: theme.palette.text.primary }}>ultimos 30 dias</Box>}
                />
              </RadioGroup>
            </Toolbar>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LineChartGeneral title="Action" data={activityActions} />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral title="Status Code" data={activityStatus} />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral title="Reason" data={activityReason} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LineChartGeneral title="Total" data={[total]} yFormat={(val) => bytesFormat(Number(val))} />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral title="Buffers" data={[buffer_info]} yFormat={(val) => bytesFormat(Number(val))} />
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}
