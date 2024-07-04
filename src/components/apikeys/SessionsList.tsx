import { Box, Stack } from '@mui/material';
import SessionItem from './SessionItem';
// redux
import { useSelector } from '../../redux/store';

export default function SessionsList() {
  const { sessions } = useSelector((state) => state.api);

  return (
    <Box>
      <Stack spacing={1} direction="column">
        {sessions.map((session) => (
          <SessionItem key={session.id} session={session} />
        ))}
      </Stack>
    </Box>
  );
}
