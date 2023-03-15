import { useState, useEffect } from 'react';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import TokenRow from './TokenRow';
import { TokenElement } from '../../../@types/sharedfiles';
// api
import { getTokensByPath } from '../../../api/sharedfiles';

interface TokensTableProps {
  url: string;
}

export default function TokensTable({ url }: TokensTableProps) {
  const [tokens, setTokens] = useState<TokenElement[]>([]);

  useEffect(() => {}, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
