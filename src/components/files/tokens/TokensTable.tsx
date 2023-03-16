import { useEffect } from 'react';
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
import { useSelector, useDispatch } from '../../../redux/store';
import { setTokens, onSetTokenInterval, cancelTokenInterval } from '../../../redux/slices/session';
// api
import { getTokensByPath, deleteTokensByPath } from '../../../api/sharedfiles';

interface TokensTableProps {
  url: string;
}

export default function TokensTable({ url }: TokensTableProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    cancelTokenInterval();
    async function getTokensEffect() {
      const tokensRes = await getTokensByPath(url, access_token);
      dispatch(setTokens(tokensRes));
    }
    getTokensEffect();
    onSetTokenInterval(setInterval(getTokensEffect, 5000));
  }, [access_token]);

  const onClickRemoveTokens = async () => {
    if (window.confirm('Desea dejar de compartir este archivo?')) {
      await deleteTokensByPath(url, access_token);
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
