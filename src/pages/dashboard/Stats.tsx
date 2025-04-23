/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useState } from 'react';
import { Toolbar, Grid, RadioGroup, FormControlLabel, Radio, Box, Tab, Button, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import { BackButton } from '../../components/atoms';
import { UsedSpacePie, UsedSpaceUserPie, UsedSpaceFileTPie, CpuUsagePie } from '../../components/dashboard/stats';
import { LineChartGeneral } from '../../components/dashboard/stats/logs';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
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
  setMemoryUsageH,
  setCpuUsage
} from '../../redux/slices/stats';
// api
import {
  getusedSpace,
  getUsedSpaceUser,
  getUsedSpaceByFileType,
  getLineChartData,
  getMemoryUsageData,
  updateUsersTrees,
  getCPUUsageData
} from '../../api/admin';
// types
import { TIMEOPTION, GROUPFILTER } from '../../@types/stats';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import { bytesFormat } from '../../utils/files';
import dayjs from 'dayjs';
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
  const [startDate, setStartDate] = useState<Date>(() => dayjs().subtract(8, 'hour').toDate());
  const [endDate, setEndDate] = useState<Date>(new Date());

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
    const dataMethods = await getLineChartData(access_token, GROUPFILTER.ACTION, time, startDate, endDate);
    setActivityActions(dataMethods);
    // methods
    const dataStatusCode = await getLineChartData(access_token, GROUPFILTER.STATUS, time, startDate, endDate);
    setActivityStatus(dataStatusCode);
    // methods
    const dataRoute = await getLineChartData(access_token, GROUPFILTER.RESAON, time, startDate, endDate);
    setActivityReason(dataRoute);
  }

  useEffect(() => {
    getActivityStats();
  }, [access_token, time, startDate, endDate]);

  async function getMemoryUsageHEffect() {
    const data = await getMemoryUsageData(access_token);
    setMemoryUsageH(data);
    const dataCPU = await getCPUUsageData(access_token);
    setCpuUsage(dataCPU.usage);
  }

  useEffect(() => {
    getMemoryUsageHEffect();
  }, [access_token]);

  useEffect(() => {
    socketClient.on('memory-usage-update', () => {
      getMemoryUsageHEffect();
    });
    socketClient.on('stats-update', () => {
      getActivityStats();
    });
    return () => {
      socketClient.removeListener('memory-usage-update');
      socketClient.removeListener('stats-update');
    };
  }, []);

  const handleUpdate = () => {
    setUpdating(true);
    enqueueSnackbar('Actualizando...', { variant: 'info' });
    updateUsersTrees(access_token)
      .then((resp) => {
        getusedSpaceEffect();
        setUpdating(false);
        enqueueSnackbar(resp.message, { variant: 'success' });
      })
      .catch((err) => {
        setUpdating(false);
      });
  };

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <TabContext value={tabValue}>
        <TabList onChange={handleChange}>
          <Tab sx={{ color: theme.palette.text.primary }} label={t('pages.admin_stats.tab_space_used')} value="0" />
          <Tab sx={{ color: theme.palette.text.primary }} label={t('pages.admin_stats.tab_activity')} value="1" />
          <Tab sx={{ color: theme.palette.text.primary }} label={t('pages.admin_stats.tab_memory_usage')} value="2" />
        </TabList>
        <Box>
          <TabPanel value="0">
            <Toolbar>
              <Button variant="contained" color="primary" onClick={handleUpdate} disabled={updating} sx={{ mr: 2 }}>
                {updating ? (
                  <Trans i18nKey="admin_stats.btn_updating">Updating</Trans>
                ) : (
                  <Trans i18nKey="admin_stats.btn_update">Update</Trans>
                )}
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
                  label={
                    <Box sx={{ color: theme.palette.text.primary }}>
                      <Trans i18nKey="pages.admin_stats.label_today">hoy</Trans>
                    </Box>
                  }
                />
                <FormControlLabel
                  value={TIMEOPTION.LAST7DAYS}
                  control={<Radio />}
                  label={
                    <Box sx={{ color: theme.palette.text.primary }}>
                      <Trans i18nKey="pages.admin_stats.label_last_7_days">ultimos 7 dias</Trans>
                    </Box>
                  }
                />
                <FormControlLabel
                  value={TIMEOPTION.THISMONTH}
                  control={<Radio />}
                  label={
                    <Box sx={{ color: theme.palette.text.primary }}>
                      <Trans i18nKey="pages.admin_stats.label_this_month">este mes</Trans>
                    </Box>
                  }
                />
                <FormControlLabel
                  value={TIMEOPTION.LAST30DAYS}
                  control={<Radio />}
                  label={
                    <Box sx={{ color: theme.palette.text.primary }}>
                      <Trans i18nKey="pages.admin_stats.label_last_30_days">ultimos 30 dias</Trans>
                    </Box>
                  }
                />
                <FormControlLabel
                  value={TIMEOPTION.CUSTOM}
                  control={<Radio />}
                  label={
                    <Box sx={{ color: theme.palette.text.primary }}>
                      <Trans i18nKey="pages.admin_stats.label_custom">rango</Trans>
                    </Box>
                  }
                />
              </RadioGroup>
            </Toolbar>
            <Grid container spacing={3}>
              {time === TIMEOPTION.CUSTOM && (
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      label={
                        <Box sx={{ color: theme.palette.text.primary }}>
                          <Trans i18nKey="pages.admin_stats.label_from">desde</Trans>
                        </Box>
                      }
                      value={dayjs(startDate)}
                      onChange={(val) => {
                        if (!val) return;
                        setStartDate(val.toDate());
                      }}
                    />
                    <DesktopDateTimePicker
                      label={
                        <Box sx={{ color: theme.palette.text.primary }}>
                          <Trans i18nKey="pages.admin_stats.label_to">hasta</Trans>
                        </Box>
                      }
                      value={dayjs(endDate)}
                      onChange={(val) => {
                        if (!val) return;
                        setEndDate(val.toDate());
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
              <Grid item xs={12}>
                <LineChartGeneral title={t('pages.admin_stats.title_action')} data={activityActions} />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral title={t('pages.admin_stats.title_status')} data={activityStatus} />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral title={t('pages.admin_stats.title_reason')} data={activityReason} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CpuUsagePie />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral
                  title={t('pages.admin_stats.title_total')}
                  data={[total]}
                  yFormat={(val) => bytesFormat(Number(val))}
                />
              </Grid>
              <Grid item xs={12}>
                <LineChartGeneral
                  title={t('pages.admin_stats.title_buffers')}
                  data={[buffer_info]}
                  yFormat={(val) => bytesFormat(Number(val))}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}
