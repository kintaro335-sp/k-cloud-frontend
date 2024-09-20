/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useRef } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
  Typography,
  Button
} from '@mui/material';
import TokenRow from './TokenRow';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../../redux/store';
import { setTokens } from '../../../redux/slices/session';
// hooks
import useAuth from '../../../hooks/useAuth';
// api
import { getTokensByPath, deleteTokensByPath } from '../../../api/sharedfiles';

interface TokensTableProps {
  url: string;
}

export default function TokensTable({ url }: TokensTableProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function getTokensEffect() {
      const tokensRes = await getTokensByPath(url, access_token);
      setTokens(tokensRes)
    }
    getTokensEffect();
  }, [access_token]);

  const onClickRemoveTokens = async () => {
    if (window.confirm('Desea dejar de compartir este archivo?')) {
      await deleteTokensByPath(url, access_token);
      setTokens([]);
      enqueueSnackbar('se dejó de compartir', { variant: 'success' });
    }
  };

  return (
    <Box>
      <Typography variant="h6">Tokens</Typography>
      <Button variant="contained" onClick={onClickRemoveTokens}>
        Dejar de Compartir
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>expira</TableCell>
              <TableCell>publico</TableCell>
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
    </Box>
  );
}
