import { useState } from 'react';
import { Dialog, DialogContent, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';
import NewTokenForm from './NewTokenForm';
import TokensTable from './TokensTable';
// redux
import { useDispatch } from '../../../redux/store';
import { cancelTokenInterval, setTokens } from '../../../redux/slices/session';

interface TokensMenuProps {
  url: string;
}

export default function TokensMenu({ url }: TokensMenuProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    cancelTokenInterval();
    dispatch(setTokens([]));
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={clickOpen}>Tokens</MenuItem>
      <Dialog open={open} onClose={clickClose}>
        <AppBar position="relative">
          <Toolbar>
            <Typography>Tokens de {url}</Typography>
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
