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
import { t } from 'i18next';
import { Trans } from 'react-i18next';
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
    if (window.confirm(t('snackbar.stop_sharing_confirm'))) {
      await deleteTokensByPath(url, access_token);
      setTokens([]);
      enqueueSnackbar(t('snackbar.msg_sharing_stopped'), { variant: 'success' });
    }
  };

  return (
    <Box>
      <Typography variant="h6"><Trans i18nKey="pages.files.tokens_menu.title_token_list">Tokens</Trans></Typography>
      <Button variant="contained" onClick={onClickRemoveTokens}>
        <Trans i18nKey="pages.files.tokens_menu.btn_stop_sharing">Dejar de Compartir</Trans>
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Trans i18nKey="pages.files.tokens_menu.tb_label_id">ID</Trans></TableCell>
              <TableCell><Trans i18nKey="pages.files.tokens_menu.tb_label_expire">expira</Trans></TableCell>
              <TableCell><Trans i18nKey="pages.files.tokens_menu.tb_label_public">publico</Trans></TableCell>
              <TableCell><Trans i18nKey="pages.files.tokens_menu.tb_label_expiration_date">fecha de expiración</Trans></TableCell>
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
