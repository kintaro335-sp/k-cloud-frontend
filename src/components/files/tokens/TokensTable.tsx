import { useState, useEffect, useRef } from 'react';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import TokenRow from './TokenRow';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { setTokens, onSetTokenInterval, cancelTokenInterval } from '../../../redux/slices/session';
// api
import { getTokensByPath } from '../../../api/sharedfiles';

interface TokensTableProps {
  url: string;
}

export default function TokensTable({ url }: TokensTableProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    cancelTokenInterval();
    async function getTokensEffect() {
      const tokensRes = await getTokensByPath(url, access_token);
      dispatch(setTokens(tokensRes));
    }
    getTokensEffect();
    onSetTokenInterval(setInterval(getTokensEffect, 5000));
  }, [access_token]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>expira</TableCell>
            <TableCell>expiración</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((t, i) => (
            <TokenRow key={i} token={t} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
