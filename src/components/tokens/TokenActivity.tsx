import { useState, useEffect, useCallback } from 'react';
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { Trans } from 'react-i18next';
// components
import { LineChartPrefab } from '../dashboard/stats/logs';
import { Loading } from '../../pages';
// icons
import { Icon } from '@iconify/react';
import statsIcon from '@iconify/icons-ant-design/pie-chart-fill';
import closeIcon from '@iconify/icons-material-symbols/close';
// redux
import { useSelector } from '../../redux/store';
// api
import { getTokenActivity } from '../../api/sharedfiles';
// types
import { TIMEOPTION, StatsLineChart } from '../../@types/stats';
// utils
import dayjs from 'dayjs';

interface ActivityTokenProps {
  tokenId: string;
  variant?: 'icon' | 'menu';
}

export default function TokenActivity({ tokenId, variant = 'icon' }: ActivityTokenProps) {
  const theme = useTheme();
  const { access_token } = useSelector((state) => state.session);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StatsLineChart>([]);
  const [time, setTime] = useState<TIMEOPTION>(TIMEOPTION.TODAY);
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'hour').toDate());
  const [endDate, setEndDate] = useState(new Date());

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  const getChartData = useCallback(async () => {
    setLoading(true);
    try {
      const dataToken = await getTokenActivity(access_token, tokenId, time, startDate, endDate);
      setData(dataToken);
    } catch (err) {}
    setLoading(false);
  }, [access_token, time, startDate, endDate]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return (
    <>
      {variant === 'icon' && (
        <Tooltip title={<Trans i18nKey="ui.token_activity.btn_stats">Estadisticas</Trans>}>
          <IconButton onClick={clickOpen}>
            <Icon icon={statsIcon} width="25px" height="25px" color={theme.palette.text.primary} />
          </IconButton>
        </Tooltip>
      )}
      {variant === 'menu' && (
        <MenuItem onClick={clickOpen}>
          <Icon icon={statsIcon} width="25px" height="25px" />{' '}
          <Trans i18nKey="ui.token_activity.btn_stats">Estadisticas</Trans>
        </MenuItem>
      )}
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <AppBar position="relative">
          <Toolbar>
            <IconButton>
              <Icon icon={closeIcon} />
            </IconButton>
            <Button variant="contained" onClick={getChartData}>
              <Trans i18nkey="ui.token_activity.btn_update">Actualizar</Trans>
            </Button>
            <Typography variant="h5">{tokenId}</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box>
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
            {time === 'custom' && (
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={1} direction="row">
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
                  </Stack>
                </LocalizationProvider>
              </Box>
            )}
          </Box>
          {loading ? (
            <Loading width="900px" height="600px" />
          ) : (
            <Box sx={{ width: '990px', height: '620px' }}>
              <LineChartPrefab data={data} />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
