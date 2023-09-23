import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';

export default function ImagePreview({ url }: { url: string }) {
  const { openImage } = useGallery()
  return (
    <Box
      onClick={() => {
        openImage(0, true, true)
      }}
      component="img"
      src={url}
      alt={url}
      width="90%"
      height="auto"
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
