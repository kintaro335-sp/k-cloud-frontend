import { useState } from 'react';
import { Dialog, DialogContent, MenuItem } from '@mui/material';
import TokensTable from './TokensTable';

interface TokensMenuProps {
  url: string;
}

export default function TokensMenu({ url }: TokensMenuProps) {
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={clickOpen}>Tokens</MenuItem>
      <Dialog open={open} onClose={clickClose}>
        <DialogContent>
          <TokensTable url={url} />
        </DialogContent>
      </Dialog>
    </>
  );
}
