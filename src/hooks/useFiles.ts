import { useContext } from 'react';
import { filesC } from '../contexts/FilesContext';

const useFiles = () => useContext(filesC);

export default useFiles;
