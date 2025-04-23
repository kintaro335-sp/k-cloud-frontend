/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import React, { createContext, useState } from 'react';
// mui
import { Dialog, DialogContent, Typography, Stack } from '@mui/material';
import VideoPlayer from '../components/atoms/VideoPlayer';

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
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
        <DialogContent
          sx={{ width: '70vw', height: '93vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Stack sx={{ width: '100%', height: '100%' }} direction='column' spacing={0}>
            <Typography variant="h5" sx={{ margin: '10px' }}>{nameFile}</Typography>
            <VideoPlayer url={source} nameFile={nameFile} />
          </Stack>
        </DialogContent>
      </Dialog>
      {children}
    </VideoPlayerC.Provider>
  );
}
