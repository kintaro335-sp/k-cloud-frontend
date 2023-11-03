import { useEffect, useRef, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { PaginationT } from '../../components/atoms';
import { LogsTable } from '../../components/dashboard/logs';
// redux
import { useSelector } from '../../redux/store';
import { setLogs, setPage, setPages } from '../../redux/slices/logs';
// api
import { getLogsList, getPagesLogs } from '../../api/admin';
import { createNewSocket } from '../../api/websocket';

export default function Logs(): JSX.Element {
  const socketClient = useRef(createNewSocket());
  const { access_token } = useSelector((state) => state.session);
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
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('stats-update', () => {
      setStatUpdate((val) => !val);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  return (
    <Box>
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
