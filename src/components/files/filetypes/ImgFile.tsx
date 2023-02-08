import { Box } from '@mui/material';

export default function ImgFile({ url }: { url: string }) {
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="220px"
      height="220px"
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
