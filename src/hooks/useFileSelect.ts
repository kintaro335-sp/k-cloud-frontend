/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useContext } from 'react';
import { FileSelectC } from '../contexts/FileSelectContext';

const useFileSelect = () => useContext(FileSelectC);

export default useFileSelect;
