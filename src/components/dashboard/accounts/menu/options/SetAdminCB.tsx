/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { setAdmin } from '../../../../../api/admin';
import { useSelector } from '../../../../../redux/store';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';

interface SetAdminCBProps {
  userid: string;
  admin: boolean;
}

export default function SetAdminCB({ userid, admin }: SetAdminCBProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { owner } = useSelector((state) => state.admin);
  const { access_token } = useSelector((state) => state.session);
  const [isAdmin, setIsAdmin] = useState(admin);

  return (
    <FormControlLabel
      checked={isAdmin}
      disabled={owner === userid}
      onChange={async (_e, checked) => {
        try {
          const response = await setAdmin(access_token, userid, checked);
          setIsAdmin(checked);
          enqueueSnackbar(t('snackbar.admin_set'), { variant: 'success' });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(t('snackbar.error_unknown'), { variant: 'error' });
        }
      }}
      control={<Checkbox />}
      label={t('pages.admin_users.menu_user.label_admin')}
    />
  );
}
