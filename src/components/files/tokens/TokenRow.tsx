/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { TableRow, TableCell, Typography, Link } from '@mui/material';
import TokenActions from './TokenActions';
import { TokenElement } from '../../../@types/sharedfiles';
import { fullDateFormat } from '../../../utils/dateformat';
import { t } from 'i18next';

interface TokenRowProps {
  token: TokenElement;
}

export default function TokenRow({ token }: TokenRowProps) {
  const { id, expires, expire, publict } = token;
  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle1">
          <Link target="_blank" href={`${window.origin}/shared-files/id/${id}`}>
            {id}
          </Link>
        </Typography>
      </TableCell>
      <TableCell>{expire ? t('common.yes') : t('common.no')}</TableCell>
      <TableCell>{publict ? t('common.yes') : t('common.no')}</TableCell>
      <TableCell>{expire ? fullDateFormat(expires) : '-'}</TableCell>
      <TableCell>
        <TokenActions id={id} token={token} />
      </TableCell>
    </TableRow>
  );
}
