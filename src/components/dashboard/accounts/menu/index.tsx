import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Dialog, DialogContent, Grid, Typography } from '@mui/material';
// components
import { SetPasswordForm, SetAdminCB } from './options';
// iconify
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outline';
// types
import { User } from '../../../../@types/admin';

export default function MenuUser({ user }: { user: User }) {
  const { id, username, admin } = user;
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={clickOpen}>
        <Icon icon={moreIcon} width="25px" height="25px" color={theme.palette.text.secondary} />
      </IconButton>
      <Dialog open={open} onClose={clickClose} maxWidth="md">
        <DialogContent>
          <Typography variant="h4">{username}</Typography>
          <Grid container>
            <Grid item xs={12}>
              <SetAdminCB userid={id} admin={admin} />
            </Grid>
            <Grid item xs={12}>
              <SetPasswordForm userid={id} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
