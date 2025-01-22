/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
// components
import { SetPasswordForm, SetAdminCB, SetOwner } from './options';
// iconify
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outline';
// redux
import { useSelector } from '../../../../redux/store';
// types
import { User } from '../../../../@types/admin';

export default function MenuUser({ user }: { user: User }) {
  const { id, username, admin } = user;
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const { owner } = useSelector((state) => state.admin);
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
          <Typography variant="h4">
            {username} {id === owner && t('pages.admin_users.label_is_owner')}
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <SetAdminCB userid={id} admin={admin} />
            </Grid>
            <Grid item xs={4}>
              <SetOwner userid={id} />
            </Grid>
            {id !== owner && <Grid item xs={12}>
              <SetPasswordForm userid={id} />
            </Grid>}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
