import React, { createContext } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// icons
import { Icon } from '@iconify/react';
import musicIcon from '@iconify/icons-material-symbols/music-note';

export const musicPlayerCtx = createContext({});

interface MusicPlayerCtxProps {
  children: React.ReactNode;
}

export default function MusicPlayerContext({ children }: MusicPlayerCtxProps) {
  const theme = useTheme();

  return (
    <>
      {children}
      <Box
        sx={{
          position: 'fixed',
          bottom: '22px',
          right: '12px',
          backgroundColor: theme.palette.background.default,
          borderRadius: '50%'
        }}
      >
        <IconButton>
          <Icon icon={musicIcon} width="32px" height="32px" color={theme.palette.text.primary} />
        </IconButton>
      </Box>
    </>
  );
}
