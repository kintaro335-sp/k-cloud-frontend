import React, { createContext, useEffect } from 'react';
import { useSelector, getState } from '../redux/store';
import { addFile, onWriteBlob, setInitializedFile } from '../redux/slices/fileUploader';
import { initializeFileAPI, writeBlobAPI, closeFileAPI } from '../api/files';
import { getBestSize, getNumberBlobs } from '../utils/files';

export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  const { access_token } = useSelector((state) => state.session);
  const { files, filesDir } = useSelector((state) => state.files);

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
  };

  useEffect(() => {
    console.log(filesDir);
    filesDir.forEach((s) => {
      setInitializedFile(s);
      console.log(getState().files.files[s]);
    });
  }, [filesDir]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
