import { useEffect, useRef, useState } from 'react';
import { Grid, Box, Toolbar } from '@mui/material';
import { PaginationT } from '../../components/atoms';
import { LogsTable } from '../../components/dashboard/logs';
import { BackButton } from '../../components/atoms';
// redux
import { useSelector } from '../../redux/store';
import { setLogs, setPage, setPages } from '../../redux/slices/logs';
// api
import { getLogsList, getPagesLogs } from '../../api/admin';
import { createNewSocket } from '../../api/websocket';

export default function Logs(): JSX.Element {
  const { access_token } = useSelector((state) => state.session);
  const socketClient = useRef(createNewSocket(access_token));
  const { page, pages } = useSelector((state) => state.logs);
  const [statUpdate, setStatUpdate] = useState(false);

  useEffect(() => {
    async function getLogsEffect() {
      const logs = await getLogsList(page, access_token);
      setLogs(logs);
      const pr = await getPagesLogs(access_token);
      setPages(pr.pages);
    }
    getLogsEffect();
  }, [access_token, page, statUpdate]);

  useEffect(() => {
    const newSocket = createNewSocket(access_token);
    newSocket.removeAllListeners();
    newSocket.on('stats-update', () => {
      setStatUpdate((val) => !val);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  return (
    <Box>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LogsTable />
        </Grid>
        <Grid item xs={12}>
          <PaginationT
            page={page}
            pages={pages}
            onChangePage={(_, pag) => {
              setPage(pag);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
