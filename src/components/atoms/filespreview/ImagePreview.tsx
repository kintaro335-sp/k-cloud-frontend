import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';
import { explorerContext } from '../../../@types/general';

interface ImagePreviewProps {
  url: string;
  arrayIndex: number | string;
  context?: explorerContext;
}

export default function ImagePreview({ url, arrayIndex, context = 'default' }: ImagePreviewProps) {
  const { openImage } = useGallery();
  return (
    <Box
      onClick={() => {
        openImage(arrayIndex, context);
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
