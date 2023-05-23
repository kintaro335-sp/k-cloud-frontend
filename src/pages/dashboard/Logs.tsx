import { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { PaginationT } from '../../components/atoms';
import { LogsTable } from '../../components/dashboard/logs';
// redux
import { useSelector } from '../../redux/store';
import { setIntervalLogsId, clearIntervalLogsId, setLogs, setPage, setPages } from '../../redux/slices/logs';
// api
import { getLogsList, getPagesLogs } from '../../api/admin';

export default function Logs(): JSX.Element {
  const { access_token } = useSelector((state) => state.session);
  const { page, pages } = useSelector((state) => state.logs);

  useEffect(() => {
    clearIntervalLogsId();
    async function getLogsEffect() {
      const logs = await getLogsList(page, access_token);
      setLogs(logs);
      const pr = await getPagesLogs(access_token);
      setPages(pr.pages);
    }
    getLogsEffect();
    // @ts-ignore
    setIntervalLogsId(setInterval(getLogsEffect, 10000));
  }, [access_token, page]);

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
