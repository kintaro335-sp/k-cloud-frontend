import { useContext } from 'react';
import { VideoPlayerC } from '../contexts/VideoPlayerContext';

const useVideoPlayer = () => useContext(VideoPlayerC);
export default useVideoPlayer;
