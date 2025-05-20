import React, { createContext, useState, useRef, useEffect } from 'react';
import { Box, IconButton, Card, CardContent, Typography, Slider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { formatTime } from '../utils/dateformat';
// icons
import { Icon } from '@iconify/react';
import musicIcon from '@iconify/icons-material-symbols/music-note';
import playArrow from '@iconify/icons-material-symbols/play-arrow';
import stopIcon from '@iconify/icons-material-symbols/stop-rounded';
import pauseIcon from '@iconify/icons-material-symbols/pause';
import repeatIcon from '@iconify/icons-material-symbols/repeat-rounded';
import volumeOff from '@iconify/icons-material-symbols/volume-off';
import volumeUp from '@iconify/icons-material-symbols/volume-up';
import closeIcon from '@iconify/icons-material-symbols/close';

export const musicPlayerCtx = createContext({ playAudio: (src: string, title: string) => {} });

interface MusicPlayerCtxProps {
  children: React.ReactNode;
}

export default function MusicPlayerContext({ children }: MusicPlayerCtxProps) {
  const theme = useTheme();
  const VOLUME_KEY = 'audiovolume';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);

  const [open, setOpen] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [audioTitle, setAudioTitle] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_KEY);
    return savedVolume !== null ? parseFloat(savedVolume) : 1;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setOpen(false);
      setAudioSrc('');
    }
  };

  useEffect(() => {
    if (audioSrc === '') {
      return;
    }
    if (audioRef.current === null) {
      return;
    }
    // Initialize audio element

    // Set up event listeners
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current?.duration || 10);
    });

    audioRef.current.addEventListener('ended', handleTrackEnd);

    audioRef.current.play();
    setIsPlaying(true);
    // Clean up
    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', () => {});
      audioRef.current?.removeEventListener('ended', handleTrackEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audioRef.current?.pause();
    };
  }, [audioSrc]);

  useEffect(() => {
    // Update volume
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTrackEnd = () => {
    if (isRepeat) {
      playTrack();
    }
  };

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleProgressChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setVolume(value);
    localStorage.setItem(VOLUME_KEY, value.toString());
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playAudio = (src: string, title: string) => {
    setAudioSrc(src);
    setAudioTitle(title);
    audioRef.current?.play();
  };

  return (
    <musicPlayerCtx.Provider value={{ playAudio }}>
      {children}
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
          position: 'fixed',
          bottom: 25,
          right: 4,
          zIndex: 999,
          display: open ? 'block' : 'none'
        }}
      >
        <CardContent>
          <IconButton onClick={handleClose}>
            <Icon icon={closeIcon} width="24px" height="24px" color={theme.palette.text.primary} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" component="div" noWrap>
                {audioTitle}
              </Typography>
            </Box>
          </Box>

          {/* Progress bar */}
          <Box sx={{ mb: 1 }}>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={currentTime}
              min={0}
              max={duration || 100}
              onChange={handleProgressChange}
              sx={{
                color: 'primary.main',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)'
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgb(25 118 210 / 16%)'
                  },
                  '&.Mui-active': {
                    width: 16,
                    height: 16
                  }
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(duration)}
              </Typography>
            </Box>
          </Box>

          {/* Controls */}
          <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label={isPlaying ? 'pause' : 'play'}
                onClick={togglePlayPause}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  mx: 1
                }}
              >
                {isPlaying ? (
                  <Icon icon={pauseIcon} width="30px" height="30px" />
                ) : (
                  <Icon icon={playArrow} width="30px" height="30px" />
                )}
              </IconButton>

              <IconButton aria-label="previous" onClick={handleStop} sx={{ mx: 1 }}>
                <Icon icon={stopIcon} width="30px" height="30px" color={theme.palette.text.primary} />
              </IconButton>
            </Box>

            <Box>
              <IconButton
                aria-label="repeat"
                onClick={() => setIsRepeat(!isRepeat)}
                color={isRepeat ? 'primary' : 'default'}
                size="small"
              >
                <Icon icon={repeatIcon} width="25px" height="25px" color={theme.palette.text.primary} />
              </IconButton>
            </Box>
          </Stack>

          {/* Volume control */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <IconButton aria-label={isMuted ? 'unmute' : 'mute'} onClick={toggleMute} size="small">
              {isMuted ? (
                <Icon icon={volumeOff} width="30px" height="30px" color={theme.palette.text.primary} />
              ) : (
                <Icon icon={volumeUp} width="30px" height="30px" color={theme.palette.text.primary} />
              )}
            </IconButton>
            <Slider
              aria-label="Volume"
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-track': {
                  border: 'none'
                },
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  backgroundColor: '#fff',
                  '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none'
                  }
                }
              }}
            />
          </Box>
        </CardContent>
      </Card>
      {audioSrc !== '' && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '22px',
            right: '12px',
            backgroundColor: theme.palette.background.default,
            borderRadius: '50%',
            boxShadow: '0 4px 8px 0 rgba(233, 233, 233, 0.25), 0 6px 20px 0 rgba(233, 233, 233, 0.25)',
            boxSizing: 'border-box'
          }}
        >
          <IconButton onClick={handleOpen}>
            <Icon icon={musicIcon} width="32px" height="32px" color={theme.palette.text.primary} />
          </IconButton>
        </Box>
      )}
      <audio ref={audioRef} src={audioSrc} style={{ display: 'none' }} />
    </musicPlayerCtx.Provider>
  );
}
