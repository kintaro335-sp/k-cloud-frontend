import { useContext } from 'react';
import { GalleryContextC } from '../contexts/GalleryContext';

const useGallery = () => useContext(GalleryContextC);

export default useGallery;
