/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState, useEffect, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
// components
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { ApiKeysList, SessionsList } from '../components/apikeys';
// redux
import { useSelector } from '../redux/store';
import { setApiKeys, setSessions } from '../redux/slices/api';
// hooks
import useAuth from '../hooks/useAuth';
// api
import { getApiKeys, getSessions } from '../api/auth';

export default function ApiKeysPage() {
  const theme = useTheme();
  const { socketClient } = useAuth();
  const { access_token } = useSelector((state) => state.session);
  const [tabValue, setTabValue] = useState('0');

  const getSessionData = useCallback(async () => {
    const sessions = await getSessions(access_token);
    setSessions(sessions.data);
    const apiKeys = await getApiKeys(access_token);
    setApiKeys(apiKeys.data);
  }, [access_token]);

  useEffect(() => {
    getSessionData();
  }, [getSessionData]);

  useEffect(() => {
    socketClient.on('sessions-update', () => {
      getSessionData()
    });

    return () => {
      socketClient.removeListener('sessions-update');
    }
  }, []);

  return <Box>
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(event, newValue) => setTabValue(newValue)} aria-label="api keys">
          <Tab label={t('pages.api_keys.tab_sessions')} value="0" />
          <Tab label={t('pages.api_keys.tab_api_keys')} value="1" />
        </TabList>
      </Box>
      <TabPanel value="0">
        <SessionsList />
      </TabPanel>
      <TabPanel value="1">
        <ApiKeysList />
      </TabPanel>
    </TabContext>
  </Box>
}
