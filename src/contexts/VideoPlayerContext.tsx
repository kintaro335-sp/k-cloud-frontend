/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import React, { createContext, useState } from 'react';
// mui
import { Dialog, AppBar, Toolbar, DialogContent, IconButton, Typography } from '@mui/material';
import VideoPlayer from '../components/atoms/VideoPlayer';
// icons
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-material-symbols/close';

export const VideoPlayerC = createContext({ setUrl: (url: string, nameFile: string) => {} });

interface BufferRange {
  start: number;
  end: number;
}

export default function VideoPlayerContext({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState('');
  const [nameFile, setNameFile] = useState('');
  const [open, setOpen] = useState(false);

  const setUrl = (url: string, nameFile: string) => {
    setSource(url);
    setNameFile(nameFile);
    setOpen(true);
  };

  return (
    <VideoPlayerC.Provider value={{ setUrl }}>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullScreen>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={() => setOpen(false)}>
              <Icon icon={closeIcon} width="25px" height="25px" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {nameFile.split('?')[0]}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <VideoPlayer url={source} nameFile={nameFile} />
        </DialogContent>
      </Dialog>
      {children}
    </VideoPlayerC.Provider>
  );
}
