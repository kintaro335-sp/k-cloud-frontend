import { useEffect, useState, useRef } from 'react';
import { Toolbar, Grid, Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BackButton } from '../../components/atoms';
import { UsedSpacePie, UsedSpaceUserPie, UsedSpaceFileTPie } from '../../components/dashboard/stats';
import { LineChartGeneral } from '../../components/dashboard/stats/logs';
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
  getMemoryUsageData
} from '../../api/admin';
import { createNewSocket } from '../../api/websocket';
// types
import { TIMEOPTION, GROUPFILTER } from '../../@types/stats';
// utils
import { bytesFormat } from '../../utils/files';
import { SerieLineChart } from '../../@types/stats';

export default function Stats() {
  const theme = useTheme();
  const socketClient = useRef(createNewSocket());
  const { access_token } = useSelector((state) => state.session);
  const { activityActions, activityReason, activityStatus, memoryUsageH } = useSelector((state) => state.stats);
  const [time, setTime] = useState<TIMEOPTION>(TIMEOPTION.TODAY);

  const processdata = (arr: SerieLineChart | undefined): SerieLineChart => {
    if (arr === undefined) {
      return { id: '', data: [] };
    }
    return arr;
  };

  const total = processdata(memoryUsageH[0]);
  const buffer_info = processdata(memoryUsageH[1]);

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
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('memory-usage-update', () => {
      getMemoryUsageHEffect();
    });
    newSocket.on('stats-update', () => {
      getActivityStats();
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Typography variant="h4" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
        Uso de Espacio
      </Typography>
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
      <Typography variant="h4" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
        Actividad
      </Typography>
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
      <Typography variant="h4" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
        Uso de Memoria
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LineChartGeneral title="Total" data={[total]} yFormat={(val) => bytesFormat(Number(val))} />
        </Grid>
        <Grid item xs={12}>
          <LineChartGeneral title="Buffers" data={[buffer_info]} yFormat={(val) => bytesFormat(Number(val))} />
        </Grid>
      </Grid>
    </>
  );
}
