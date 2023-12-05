import { Box, Button, Grid, Stack } from '@mui/material';
import TokenUElement from './TokenUElement';
// hooks
import { useSelector } from '../../redux/store';
import useFileSelect from '../../hooks/useFileSelect';
// api
import { deleteTokens } from '../../api/sharedfiles';

export default function TokensUList() {
  const { access_token } = useSelector((state) => state.session);
  const { tokens } = useSelector((state) => state.sharedfilesuser);
  const { files, clearSelect, selectAll } = useFileSelect();

  const deleteTokensC = async () => {
    await deleteTokens(files, access_token);
    clearSelect();
  };

  const selectAllC = () => {
    selectAll(tokens.map((t) => t.id));
  };

  return (
    <Box sx={{ width: '100vw' }}>
      <Box sx={{ marginBottom: '24px', height: '37px' }}>
        {files.length !== 0 && (
          <Stack spacing={1} direction="row">
            <Box>
              <Button variant="contained" onClick={deleteTokensC}>
                Eliminar
              </Button>
            </Box>
            <Box>
              <Button variant="contained" onClick={selectAllC}>
                Selecionar Todo
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
      <Grid container spacing={2} sx={{ width: '100%', overflowY: 'scroll', height: '78vh' }}>
        {tokens.map((t, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <TokenUElement token={t} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
