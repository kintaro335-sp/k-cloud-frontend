import { useState, useRef, useEffect, useCallback } from 'react';
// components
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { ApiKeysList, SessionsList } from '../components/apikeys';
// redux
import { useSelector } from '../redux/store';
import { setApiKeys, setSessions } from '../redux/slices/api';
// api
import { createNewSocket } from '../api/websocket';
import { getApiKeys, getSessions } from '../api/auth';

export default function ApiKeysPage() {
  const theme = useTheme();
  const socketClient = useRef(createNewSocket());
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
    const newSocket = createNewSocket();
    newSocket.removeAllListeners();
    newSocket.auth = { access_token };
    newSocket.on('sessions-update', () => {
      getSessionData()
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  return <Box>
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(event, newValue) => setTabValue(newValue)} aria-label="api keys">
          <Tab label="Sessiones" value="0" />
          <Tab label="Api Keys" value="1" />
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
