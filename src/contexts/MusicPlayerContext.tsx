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

interface CustomSliderProps {
  value: number;
  max: number;
  buffered: number;
  onChange: (value: number) => void;
  formatTime: (time: number) => string;
}

function CustomSlider({ value, max, buffered, onChange, formatTime }: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);

  const progressPercentage = max > 0 ? (value / max) * 100 : 0;
  const bufferedPercentage = max > 0 ? (buffered / max) * 100 : 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const timeAtPosition = (percentage / 100) * max;

      setHoverTime(timeAtPosition);
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        onChange(timeAtPosition);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newTime = (percentage / 100) * max;
      onChange(newTime);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const timeAtPosition = (percentage / 100) * max;
        onChange(timeAtPosition);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, max, onChange]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        sx={{
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          position: 'relative',
          cursor: 'pointer',
          '&:hover': {
            height: 8
          },
          transition: 'height 0.2s ease'
        }}
      >
        {/* Buffer progress */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${bufferedPercentage}%`,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
            transition: 'width 0.3s ease'
          }}
        />

        {/* Current progress */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progressPercentage}%`,
            backgroundColor: 'primary.main',
            borderRadius: 3,
            transition: isDragging ? 'none' : 'width 0.1s ease'
          }}
        />

        {/* Progress thumb */}
        <Box
          sx={{
            position: 'absolute',
            left: `${progressPercentage}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            opacity: isDragging ? 1 : 0,
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 1
            }
          }}
        />
      </Box>

      {/* Time tooltip */}
      {hoverTime !== null && (
        <Box
          sx={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y - 40,
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 1,
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 1000,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '4px solid transparent',
              borderTopColor: 'rgba(0, 0, 0, 0.8)'
            }
          }}
        >
          {formatTime(hoverTime)}
        </Box>
      )}
    </Box>
  );
}

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
  const [bufferedTime, setBufferedTime] = useState(0);

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

    audioRef.current.addEventListener('progress', () => {
      if (audioRef.current === null) return;
      if (audioRef.current.buffered.length > 0) {
        setBufferedTime(audioRef.current.buffered.end(audioRef.current.buffered.length - 1));
      }
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

  const handleProgressChange = (_: Event | null, newValue: number | number[]) => {
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
            <CustomSlider
              value={currentTime}
              max={duration}
              buffered={bufferedTime}
              onChange={(val) => handleProgressChange(null, val)}
              formatTime={formatTime}
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
