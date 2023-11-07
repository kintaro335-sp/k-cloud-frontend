import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';

interface ImagePreviewProps {
  url: string;
  arrayIndex: number;
}

export default function ImagePreview({ url, arrayIndex }: ImagePreviewProps) {
  const { openImage } = useGallery();
  return (
    <Box
      onClick={() => {
        openImage(arrayIndex, true, true);
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
