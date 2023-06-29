import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';

interface ImgFileProps {
  url: string;
  arrayIndex: number;
  sfc?: boolean;
}

export default function ImgFile({ url, arrayIndex, sfc = false }: ImgFileProps) {
  const { openImage } = useGallery();
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="220px"
      height="220px"
      onClick={() => {
        openImage(arrayIndex, sfc);
      }}
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
