import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';
import { explorerContext } from '../../../@types/general';

interface ImgFileProps {
  url: string;
  context: explorerContext;
  index?: number;
}

export default function ImgFile({ url, context, index }: ImgFileProps) {
  const { openImage } = useGallery();
  return (
    <Box
      component="img"
      src={url}
      alt={url}
      width="220px"
      height="220px"
      onClick={() => {
        if (context === 'sharedFile' || context === 'tokenView' || context === 'default') {
          if (index === undefined) {
            openImage(url, context);
            return;
          }
          openImage(index, context);
        } else {
          openImage(url, context);
        }
      }}
      sx={{ objectFit: 'cover', objectPosition: '80% 0%' }}
    />
  );
}
