/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { Box, Dialog, DialogContent, AppBar, Toolbar, Typography } from '@mui/material';
import useVideoPlayer from '../../../hooks/useVideoPlayer';
import { Icon } from '@iconify/react';
import videoIcon from '@iconify/icons-ant-design/video-camera-filled';

export default function VideoFile({ url, nameFile }: { url: string; nameFile: string }) {
  const { setUrl } = useVideoPlayer();

  const clickOpen = () => {
    setUrl(url, nameFile);
  };

  return (
    <>
      <Box
        onClick={clickOpen}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
      >
        <Icon icon={videoIcon} width="220px" height="220px" />
      </Box>
    </>
  );
}
