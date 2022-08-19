import { Box } from '@mui/material';

export default function ImgFile({ url }: { url: string }) {
  return <Box component="img" src={url} alt={url} width="100%" height="auto" />;
}
