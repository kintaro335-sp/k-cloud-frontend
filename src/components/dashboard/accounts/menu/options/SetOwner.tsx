/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Button } from '@mui/material';
import { setOwner } from '../../../../../api/admin';
import { useSelector } from '../../../../../redux/store';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

interface SetOwnerProps {
  userid: string;
}

export default function SetOwner({ userid }: SetOwnerProps) {
  const { owner } = useSelector((state) => state.admin);
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {owner !== userid && (
        <Button
          variant="contained"
          onClick={() => {
            if (!window.confirm(t('snackbar.owner_set_confirm'))) return;
            setOwner(access_token, userid).then(() => {
              enqueueSnackbar(`${t('snackbar.user_set_as_owner')}: ${userid}`, {
                variant: 'success'
              });
            });
          }}
        >
          <Trans i18nKey="pages.admin_users.menu_user.label_set_owner">establecer como dueño</Trans>
        </Button>
      )}
    </>
  );
}
