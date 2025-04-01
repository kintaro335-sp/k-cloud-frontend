/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useRef, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Trans } from 'react-i18next';
// components
import LogRow from './LogRow';
// redux
import { useSelector } from '../../../redux/store';

export default function LogsTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { logs } = useSelector((state) => state.logs);

  useEffect(() => {
    tableContainerRef.current?.scrollTo(0, 0);
  }, [logs]);
  return (
    <TableContainer ref={tableContainerRef} sx={{ height: 'calc(100vh - 200px)' }}>
      <Table>
        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#0b090a' }}>
          <TableRow>
            <TableCell><Trans i18nKey="pages.admin_logs.label_date">Fecha</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_user">Usuario</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_token_id">tokenId</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_route">Ruta</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_action">accion</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_reason">Razon</Trans></TableCell>
            <TableCell><Trans i18nKey="pages.admin_logs.label_status">Estado</Trans></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: 'scroll' }}>
          {logs.map((l, i) => (
            <LogRow key={i} info={l} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
