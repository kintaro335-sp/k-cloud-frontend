/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { Dialog, DialogContent, MenuItem, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  variantBtn?: 'menu' | 'icon';
}

export default function TokensMenu({ url, onClose, variantBtn = 'menu' }: TokensMenuProps) {
  const theme = useTheme();
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
      {variantBtn === 'icon' && (
        <Tooltip title={<Trans i18nKey="pages.files.femenu.tokens">Tokens</Trans>}>
          <IconButton onClick={clickOpen}>
            <Icon icon={tokensIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
          </IconButton>
        </Tooltip>
      )}
      {variantBtn === 'menu' && (
        <MenuItem onClick={clickOpen}>
          <Icon icon={tokensIcon} width="20px" height="20px" />
          <Trans i18nKey="pages.files.femenu.tokens">Tokens</Trans>
        </MenuItem>
      )}
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5">
              <Trans i18nKey="pages.files.tokens_menu.tokens_of">Tokens de</Trans> {url}
            </Typography>
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
