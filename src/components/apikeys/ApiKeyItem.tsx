/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

// components
import { Card, CardHeader, CardContent, TextField, Box, Button, Chip, Stack } from '@mui/material';
import EditApiKeyForm from './EditApiKeyForm';
import { Trans } from 'react-i18next';
import { useSnackbar } from 'notistack';
// types
import { ApiKey } from '../../@types/apikeys';
// redux
import { useSelector } from '../../redux/store';
// api
import { revokeSession } from '../../api/auth';

export default function ApiKeyItem({ apiKey }: { apiKey: ApiKey }) {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const handleRevokeSession = async () => {
    await revokeSession(access_token, apiKey.id);
    enqueueSnackbar('Sesión revocada', { variant: 'success' });
  };

  return (
    <Card>
      <CardHeader
        title={apiKey.name}
        subheader={
          <Box sx={{ padding: '10px' }}>
            <TextField defaultValue={apiKey.token} value={apiKey.token} variant="standard" fullWidth />
            <Box sx={{ marginTop: '10px' }}>
              <Stack direction="row" spacing={1}>
                {apiKey.scopes.map((scope) => (
                  <Chip key={scope} label={scope} />
                ))}
              </Stack>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Stack spacing={1} direction="row">
          <EditApiKeyForm id={apiKey.id} name={apiKey.name} scopes={apiKey.scopes} />
          <Button variant="outlined" color="error" onClick={handleRevokeSession}>
            <Trans i18nKey="pages.api_keys.btn_remove">Remover</Trans>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
