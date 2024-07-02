// components
import { Box, Stack, Card, CardHeader } from '@mui/material';
import CreateApiKeyForm from './CreateApiKeyForm';
import ApiKeyItem from './ApiKeyItem';
// redux
import { useSelector } from '../../redux/store';

export default function ApiKeysList() {
  const { apiKeys } = useSelector((state) => state.api);

  return (
    <Box>
      <Box sx={{ padding: '10px' }}>
        <CreateApiKeyForm />
      </Box>
      <Stack spacing={1} direction="column">
        {apiKeys.map((apiKey) => (
          <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
        ))}
        {apiKeys.length === 0 && (
          <Card>
            <CardHeader title="No hay API keys" />
          </Card>
        )}
      </Stack>
    </Box>
  );
}
