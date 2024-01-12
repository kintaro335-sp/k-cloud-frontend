import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';
import { explorerContext } from '../../../@types/general';

interface ImgFileProps {
  url: string;
  arrayIndex: number;
  context?: explorerContext;
}

export default function ImgFile({ url, arrayIndex, context = 'default' }: ImgFileProps) {
  const { openImage } = useGallery();
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="220px"
      height="220px"
      onClick={() => {
        openImage(arrayIndex, context);
      }}
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
