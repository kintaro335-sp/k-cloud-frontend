import { Box } from '@mui/material';

export default function VideoFile({ url }: { url: string }) {
  return <Box component="video" src={url} width="100%" height="auto" controls />;
}
