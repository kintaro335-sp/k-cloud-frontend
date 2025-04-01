/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import React, { createContext, useState, useRef, useEffect } from 'react';
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
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
        <DialogContent
          sx={{ width: '70vw', height: '93vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <VideoPlayer url={source} nameFile={nameFile} />
        </DialogContent>
      </Dialog>
      {children}
    </VideoPlayerC.Provider>
  );
}
