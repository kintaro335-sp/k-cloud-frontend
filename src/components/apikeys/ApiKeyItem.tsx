// components
import { Card, CardHeader, CardContent, TextField, Box, Button } from '@mui/material';
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
          <Box sx={{ padding: '50px' }}>
            <TextField defaultValue={apiKey.token} value={apiKey.token} variant="standard" fullWidth />
          </Box>
        }
      />
      <CardContent>
        <Button variant="outlined" color="error" onClick={handleRevokeSession}>
          Remover
        </Button>
      </CardContent>
    </Card>
  );
}
