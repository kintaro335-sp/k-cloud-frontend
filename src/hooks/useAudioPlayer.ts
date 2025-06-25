import { useContext } from 'react';
import { musicPlayerCtx } from '../contexts/MusicPlayerContext';

const useAudioPlayer = () => useContext(musicPlayerCtx);

export default useAudioPlayer;
