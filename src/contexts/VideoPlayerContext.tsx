/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import React, { createContext, useState } from 'react';
// mui
import { Dialog, DialogContent, Typography, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VideoPlayer from '../components/atoms/VideoPlayer';
// icons
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-material-symbols/close';

export const VideoPlayerC = createContext({ setUrl: (url: string, nameFile: string) => {} });

export default function VideoPlayerContext({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [source, setSource] = useState('');
  const [nameFile, setNameFile] = useState('');
  const [open, setOpen] = useState(false);

  const clickClose = () => {
    setOpen(false);
  }

  const setUrl = (url: string, nameFile: string) => {
    setSource(url);
    setNameFile(nameFile);
    setOpen(true);
  };

  return (
    <VideoPlayerC.Provider value={{ setUrl }}>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullScreen sx={{ backgroundColor: 'transparent' }}>
        <DialogContent
          sx={{ width: '90vw', height: '93vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}
        >
          <Stack sx={{ width: '100%', height: '100%' }} direction='column' spacing={0}>
            <Stack direction='row'>
              <IconButton onClick={clickClose}>
                <Icon icon={closeIcon} width="28px" height="28px" color={theme.palette.text.secondary} />
              </IconButton>
              <Typography variant="h5" sx={{ margin: '10px' }}>{nameFile}</Typography>
            </Stack>
            <VideoPlayer url={source} />
          </Stack>
        </DialogContent>
      </Dialog>
      {children}
    </VideoPlayerC.Provider>
  );
}
