import { Box } from '@mui/material';

export default function ImgFile({ url }: { url: string }) {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box component="img" src={url} alt="img" sx={{ wdith: 'auto', height: '100%' }} />
    </Box>
  );
}
