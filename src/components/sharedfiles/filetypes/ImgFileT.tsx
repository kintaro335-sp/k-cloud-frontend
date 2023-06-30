import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';

interface ImgFileProps {
  url: string;
}

export default function ImgFile({ url }: ImgFileProps) {
  const { openImage } = useGallery();
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="220px"
      height="220px"
      onClick={() => {
        openImage(url);
      }}
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
