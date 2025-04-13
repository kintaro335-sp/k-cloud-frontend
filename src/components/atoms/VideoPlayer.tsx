/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import React, { useState, useRef, useEffect } from 'react';
// mui
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// icons
import { Icon } from '@iconify/react';
import playArrow from '@iconify/icons-material-symbols/play-arrow';
import pauseIcon from '@iconify/icons-material-symbols/pause';
import fastRewindIcon from '@iconify/icons-material-symbols/fast-rewind';
import fastforwardIcon from '@iconify/icons-material-symbols/fast-forward';
import volumeOff from '@iconify/icons-material-symbols/volume-off';
import volumeUp from '@iconify/icons-material-symbols/volume-up';
import fullscreenIcon from '@iconify/icons-material-symbols/fullscreen';
import fullscreenExitIcon from '@iconify/icons-material-symbols/fullscreen-exit';
import './css/videoplayer.css';

interface BufferRange {
  start: number;
  end: number;
}

export default function VideoPlayer({ url, nameFile }: { url: string; nameFile: string }) {
  const theme = useTheme();
  const VOLUME_KEY = 'videovolume';

  const timeOutId = useRef<number>(null);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoControlsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hoverPositionBar, setHoverPositionBar] = useState(0);
  const [hoverTime, setHoverTime] = useState(0);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_KEY);
    return savedVolume !== null ? parseFloat(savedVolume) : 1;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [bufferRanges, setBufferRanges] = useState<BufferRange[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    localStorage.setItem(VOLUME_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateBufferRanges = () => {
      const ranges: BufferRange[] = [];
      const bufferEnd = video.buffered.end(video.buffered.length - 1);
      if (video.buffered.length > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
          const start = video.buffered.start(i);
          const end = video.buffered.end(i);
          if (start < video.duration && end > 0) {
            ranges.push({ start, end });
          }
        }
      }
      if (bufferEnd - currentTime < 30 && currentTime > 0 && duration - currentTime > 30) {
        video.load();
      }
      setBufferRanges(ranges);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      updateBufferRanges();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      updateBufferRanges();
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', updateBufferRanges);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', updateBufferRanges);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const setVolumeKey = (value: number) => {
    if (videoRef.current && value >= 0 && value <= 1) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        videoRef.current.volume = volume;
      } else {
        videoRef.current.volume = 0;
      }
    }
  };

  const skip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) - hours * 60;
    const seconds = Math.floor(time % 60);
    return `${hours === 0 ? '' : hours.toString().padStart(2, '0') + ':'}${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const time = pos * duration;
      const finalPos = pos * 100;
      setHoverPositionBar(finalPos);
      if (finalPos < 2.5) {
        setHoverPosition(2.5);
      } else if (finalPos > 97.5) {
        setHoverPosition(97.5);
      } else {
        setHoverPosition(finalPos);
      }
      setHoverTime(time);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const setHideTimeout = () => {
    const videoPlayer = videoRef.current;
    const videoControls = videoControlsRef.current;
    if (!videoControls) return;
    if (!videoPlayer) return;
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    // @ts-ignore
    timeOutId.current = setTimeout(() => {
      videoControls.style.display = 'none';
      videoPlayer.style.cursor = 'none';
    }, 3000);
    videoControls.style.display = 'block';
    videoPlayer.style.cursor = 'default';
  };

  useEffect(() => {
    if (videoRef.current === null) return;
    const savedVolume = localStorage.getItem(VOLUME_KEY);
    if (savedVolume === null) return;
    videoRef.current.volume = parseFloat(savedVolume);
  }, [videoRef.current]);

  const videoplayerWidth = isFullscreen ? '100vw' : '100%';
  const videoplayerHeight = isFullscreen ? '100vh' : 'auto';

  const videoContainerPadding = isFullscreen ? '56%' : '50%';

  return (
    <Paper
      elevation={3}
      sx={{ width: videoplayerWidth, margin: '0', p: 0, height: videoplayerHeight, overflow: 'hidden' }}
      ref={containerRef}
      onMouseMove={() => {
        setHideTimeout();
      }}
      onMouseOut={() => {
        setHideTimeout();
      }}
    >
      <Box ref={videoContainerRef} sx={{ position: 'relative', width: '100%', paddingTop: videoContainerPadding }}>
        <video
          ref={videoRef}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
          src={url}
          preload="metadata"
          onClick={() => {
            setHideTimeout();
            togglePlay();
          }}
          onDoubleClick={toggleFullscreen}
          onKeyDown={(event) => {
            if (event.code === 'Space') {
              togglePlay();
            }
            if (event.code === 'ArrowLeft') {
              skip(-5);
            }
            if (event.code === 'ArrowRight') {
              skip(5);
            }
            if (event.code === 'ArrowUp') {
              setVolumeKey(volume + 0.1);
            }
            if (event.code === 'ArrowDown') {
              setVolumeKey(volume - 0.1);
            }
          }}
        />
        <Box
          ref={videoControlsRef}
          onClick={() => videoRef.current?.focus()}
          className="video-controls-show"
          sx={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <Box sx={{ position: 'relative', width: videoContainerRef.current?.clientWidth }}>
            <Box
              sx={{
                mt: 2,
                mb: 1,
                position: 'relative',
                height: '8px',
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer'
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                videoRef.current?.focus();
                handleSeek(e);
              }}
              ref={progressRef}
            >
              {bufferRanges.map((range, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    left: `${(range.start / duration) * 100}%`,
                    width: `${((range.end - range.start) / duration) * 100}%`,
                    height: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.5)'
                  }}
                />
              ))}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  width: `${(currentTime / duration) * 100}%`,
                  height: '100%',
                  bgcolor: 'primary.main'
                }}
              />
              {isHovering && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${hoverPositionBar}%`,
                      height: '100%',
                      width: '2px',
                      bgcolor: 'white',
                      transform: 'translateX(-50%)',
                      zIndex: 2
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${hoverPosition}%`,
                      top: '-30px',
                      transform: 'translateX(-50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {formatTime(hoverTime)}
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => {
                    videoRef.current?.focus();
                    skip(-10);
                  }}
                  size="small"
                  className="player-button"
                >
                  <Icon icon={fastRewindIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    videoRef.current?.focus();
                    togglePlay();
                  }}
                  size="small"
                  className="player-button"
                >
                  {isPlaying ? (
                    <Icon icon={pauseIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
                  ) : (
                    <Icon icon={playArrow} width="20px" height="20px" color={theme.palette.text.secondary} />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    videoRef.current?.focus();
                    skip(10);
                  }}
                  size="small"
                  className="player-button"
                >
                  <Icon icon={fastforwardIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    videoRef.current?.focus();
                    toggleMute();
                  }}
                  size="small"
                  className="player-button"
                >
                  {isMuted ? (
                    <Icon icon={volumeOff} width="20px" height="20px" color={theme.palette.text.secondary} />
                  ) : (
                    <Icon icon={volumeUp} width="20px" height="20px" color={theme.palette.text.secondary} />
                  )}
                </IconButton>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    videoRef.current?.focus();
                    handleVolumeChange(e);
                  }}
                  className="player-button"
                  style={{ width: '75px', marginLeft: '8px', verticalAlign: 'middle' }}
                />
                <Typography variant="body2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
                <IconButton
                  onClick={() => {
                    videoRef.current?.focus();
                    toggleFullscreen();
                  }}
                  size="small"
                  className="player-button"
                >
                  {isFullscreen ? (
                    <Icon icon={fullscreenExitIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
                  ) : (
                    <Icon icon={fullscreenIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
