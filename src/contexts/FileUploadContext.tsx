import React, { createContext, useEffect } from 'react';
import { useSelector, getState } from '../redux/store';
import { addFile, onWriteBlob, setInitializedFile } from '../redux/slices/fileUploader';
import { initializeFileAPI, writeBlobAPI, closeFileAPI } from '../api/files';
import { getBestSize, getNumberBlobs, BLOB_SIZE, getBase64File } from '../utils/files';

export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  const { access_token } = useSelector((state) => state.session);
  const { files, filesDir } = useSelector((state) => state.files);

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
  };

  const getFilesState = () => getState().files;

  const initializeFile = async (path: string) => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    await initializeFileAPI(path, fileM.size, access_token);
    setInitializedFile(path);
    return;
  };

  const sendBlob = async (path: string, position: number, size: number) => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blob = fileM.file.slice(position, position + size);
    const blobBase64 = getBase64File(blob);
    if (typeof blobBase64 === 'string') {
      await writeBlobAPI(path, position, blobBase64, access_token);
      onWriteBlob(path, position, size);
    }
  };

  const sendBlobs = async (path: string): Promise<void> => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blobs = getNumberBlobs(fileM.size);
    for (let i = 0; i < blobs; i++) {
      const position = BLOB_SIZE * i;
      await sendBlob(path, position, BLOB_SIZE);
    }
    return new Promise((res) => {
      res();
    });
  };

  const uploadFileStart = async (path: string) => {
    await initializeFile(path);
    await sendBlobs(path);
  };

  useEffect(() => {
    filesDir.forEach((dir) => {
      const files = getFilesState();
      const fileM = files.files[dir];
      if (fileM === null) return;
      if (fileM === undefined) return;
      if (!fileM.inicializado) {
        uploadFileStart(dir);
      }
    });
  }, [filesDir]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
