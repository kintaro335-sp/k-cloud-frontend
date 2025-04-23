/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import useGallery from '../../../hooks/useGallery';
import { explorerContext } from '../../../@types/general';
import './css/img.css';

interface ImgFileProps {
  url: string;
  context: explorerContext;
  index?: number;
}

export default function ImgFile({ url, context, index }: ImgFileProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const { openImage } = useGallery();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: { xs: '310px', sm: '290px', md: '250px', lg: '220px' }
      }}
    >
      <img
        className="imgfilepreview"
        ref={imgRef}
        onMouseMoveCapture={(event) => {
          const width = imgRef.current?.width as number;
          const height = imgRef.current?.height as number;

          const mousePositionX = event.pageX;
          const mousePositionY = event.pageY;

          const elementPosition = imgRef.current?.getBoundingClientRect();

          const decimalX = (mousePositionX - (elementPosition?.x || 1)) / width;
          const decimalY = (mousePositionY - (elementPosition?.y || 1)) / height;

          const percentX = decimalX * 100;
          const percentY = decimalY * 100;

          imgRef.current?.style.setProperty('object-position', `${percentX.toFixed(2)}% ${percentY.toFixed(2)}%`);
        }}
        onMouseOut={() => {
          imgRef.current?.style.setProperty('object-position', '50% 50%');
        }}
        src={url}
        loading='lazy'
        alt={url}
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
        width="100%"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 50%',
          cursor: 'pointer'
        }}
      />
    </Box>
  );
}
