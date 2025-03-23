/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

// components
import { Card, CardHeader, CardContent, Box, Button, Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import { useSnackbar } from 'notistack';
// types
import { Session } from '../../@types/apikeys';
// redux
import { useSelector } from '../../redux/store';
// api
import { revokeSession } from '../../api/auth';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import { fullDateFormat } from '../../utils/dateformat';

export default function SessionItem({ session }: { session: Session }) {
  const { access_token } = useSelector((state) => state.session);
  const { sessionId } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleRevokeSession = async () => {
    await revokeSession(access_token, session.id);
    enqueueSnackbar('Sesión revocada', { variant: 'success' });
  };

  return (
    <Card>
      <CardHeader
        title={session.device}
        subheader={
          <Box>
            <Typography>expira: {fullDateFormat(session.expire)}</Typography>
            {session.id === sessionId && <Typography>actual</Typography>}
          </Box>
        }
      />
      <CardContent>
        {sessionId !== session.id && (
          <Button variant="outlined" color="error" onClick={handleRevokeSession}>
            <Trans i18nKey="pages.api_keys.btn_revoke_session">Revocar sesión</Trans>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
