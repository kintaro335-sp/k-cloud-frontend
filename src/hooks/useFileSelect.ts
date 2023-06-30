import { useContext } from 'react';
import { FileSelectC } from '../contexts/FileSelectContext';

const useFileSelect = () => useContext(FileSelectC);

export default useFileSelect;
