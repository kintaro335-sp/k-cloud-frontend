import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// components
import LogRow from './LogRow';
// redux
import { useSelector } from '../../../redux/store';

export default function LogsTable() {
  const { logs } = useSelector((state) => state.logs);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Ruta</TableCell>
            <TableCell>Metodo</TableCell>
            <TableCell>Codigo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((l, i) => (
            <LogRow key={i} info={l} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
