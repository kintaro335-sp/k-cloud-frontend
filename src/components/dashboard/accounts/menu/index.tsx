import { useState } from 'react';
import { IconButton, Dialog, DialogContent } from '@mui/material';
// iconify
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outline';
// types
import { User } from '../../../../@types/admin';

export default function MenuUser({ user }: { user: User }) {
  const { id } = user;
  const [open, setOpen] = useState<boolean>(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={clickOpen}>
        <Icon icon={moreIcon} />
      </IconButton>
      <Dialog open={open} onClose={clickClose} maxWidth="md">
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
}
