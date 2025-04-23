/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useContext } from 'react';
import { GalleryContextC } from '../contexts/GalleryContext';

const useGallery = () => useContext(GalleryContextC);

export default useGallery;
