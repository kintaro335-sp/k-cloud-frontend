/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useRef, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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
            <TableCell>Fecha</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>tokenId</TableCell>
            <TableCell>Ruta</TableCell>
            <TableCell>accion</TableCell>
            <TableCell>Razon</TableCell>
            <TableCell>Estado</TableCell>
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
