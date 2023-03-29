import { Box } from '@mui/material';

export default function ImagePreview({ url }: { url: string }) {
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="90%"
      height="auto"
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
