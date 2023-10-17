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
  setActivityMethods,
  setActivityRoute,
  setActivityStatuscode,
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
  const { activityMethods, activityRoute, activityStatuscode, memoryUsageH } = useSelector((state) => state.stats);
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

  useEffect(() => {
    async function getActivityStats() {
      // methods
      const dataMethods = await getLineChartData(GROUPFILTER.METHOD, time, access_token);
      setActivityMethods(dataMethods);
      // methods
      const dataStatusCode = await getLineChartData(GROUPFILTER.STATUSCODE, time, access_token);
      setActivityStatuscode(dataStatusCode);
      // methods
      const dataRoute = await getLineChartData(GROUPFILTER.ROUTE, time, access_token);
      setActivityRoute(dataRoute);
    }
    getActivityStats();
  }, [time]);

  useEffect(() => {
    async function getMemoryUsageHEffect() {
      const data = await getMemoryUsageData(access_token);
      setMemoryUsageH(data);
      setMemoryUsageH(data);
    }
    getMemoryUsageHEffect();
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('memory-usage-update', async () => {
      getMemoryUsageHEffect();
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
          <LineChartGeneral title="method" data={activityMethods} />
        </Grid>
        <Grid item xs={12}>
          <LineChartGeneral title="Status Code" data={activityStatuscode} />
        </Grid>
        <Grid item xs={12}>
          <LineChartGeneral title="Route" data={activityRoute} />
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
