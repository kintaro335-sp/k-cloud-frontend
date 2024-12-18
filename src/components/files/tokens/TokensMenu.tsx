/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { Dialog, DialogContent, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';
import NewTokenForm from './NewTokenForm';
import TokensTable from './TokensTable';
import { Trans } from 'react-i18next';
// redux
import { setTokens } from '../../../redux/slices/session';
import { Icon } from '@iconify/react';
import tokensIcon from '@iconify/icons-material-symbols/format-list-bulleted';

interface TokensMenuProps {
  url: string;
  onClose?: VoidFunction;
}

export default function TokensMenu({ url, onClose }: TokensMenuProps) {
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setTokens([]);
    setOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      <MenuItem onClick={clickOpen}>
        <Icon icon={tokensIcon} width="20px" height="20px" /><Trans i18nKey="pages.files.femenu.tokens">Tokens</Trans>
      </MenuItem>
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5"><Trans i18nKey="pages.files.tokensmenu.tokens_of">Tokens de</Trans> {url}</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <NewTokenForm url={url} />
          <TokensTable url={url} />
        </DialogContent>
      </Dialog>
    </>
  );
}
