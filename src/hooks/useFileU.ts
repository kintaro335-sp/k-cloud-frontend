import { useContext } from 'react';
import { FileUploadContext } from '../contexts/FileUploadContext';

const useFileU = () => useContext(FileUploadContext);

export default useFileU;
