/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import audioIcon from '@iconify/icons-ant-design/audio-filled';

import useAudioPlayer from '../../../hooks/useAudioPlayer';

interface AudioFileProps {
  nameFile: string;
  url: string;
}

export default function AudioFile({ nameFile, url }: AudioFileProps) {
  const { playAudio } = useAudioPlayer();

  return (
    <Box
      onClick={() => playAudio(url, nameFile)}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
    >
      <Icon icon={audioIcon} width="250px" height="250px" />
    </Box>
  );
}
