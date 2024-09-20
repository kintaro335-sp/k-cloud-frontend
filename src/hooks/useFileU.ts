/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useContext } from 'react';
import { FileUploadContext } from '../contexts/FileUploadContext';

const useFileU = () => useContext(FileUploadContext);

export default useFileU;
