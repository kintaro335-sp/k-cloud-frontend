import React, { createContext, useEffect } from 'react';
import { useSelector, getState } from '../redux/store';
import {
  addFile,
  onWriteBlob,
  setInitializedFile,
  setTotalBlobs,
  setBlobsSended,
  removeFileUploading,
  removeCompletedFiles
} from '../redux/slices/fileUploader';
import { initializeFileAPI, uploadBlobAPI, closeFileAPI, statusFileAPI } from '../api/files';
import { getNumberBlobs, BLOB_SIZE } from '../utils/files';
import { timeOutIf } from '../utils/promises';
import { isAxiosError } from 'axios';

export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  const { access_token } = useSelector((state) => state.session);
  const { filesDir } = useSelector((state) => state.files);

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
  };

  const getFilesState = () => getState().files;

  const initializeFile = async (path: string): Promise<boolean> => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return false;
    if (fileM === undefined) return false;
    return new Promise((resolve) => {
      initializeFileAPI(path, fileM.size, access_token)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            resolve(false);
          }
        });
      setInitializedFile(path);
    });
  };

  const sendBlob = async (path: string, position: number, size: number): Promise<void> => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blob = fileM.file.slice(position, position + size);
    return new Promise((resolve) => {
      uploadBlobAPI(path, position, blob, access_token)
        .catch((err) => {
          if (isAxiosError(err)) {
            console.error(err);
          }
          resolve();
        })
        .then(() => {
          onWriteBlob(path, position, blob.size);
          resolve();
        });
    });
  };

  const sendBlobs = async (path: string): Promise<void> => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blobs = getNumberBlobs(fileM.size);
    setTotalBlobs(path, blobs);
    for (let i = 0; i <= blobs; i++) {
      let pass = false;
      const positionfrom = BLOB_SIZE * i;
      const positionto = BLOB_SIZE * (i + 1);
      const n = await sendBlob(path, positionfrom, positionto - positionfrom);
      setBlobsSended(path, i);
      const backendStatus = await statusFileAPI(path, access_token);
      pass = backendStatus.blobsNum <= 3;
      while (!pass) {
        const backendStatus = await statusFileAPI(path, access_token);
        const applyTimeout = backendStatus.blobsNum === 0;
        await timeOutIf(5000, () => applyTimeout);
        pass = applyTimeout;
      }
    }
    return new Promise((res) => {
      res();
    });
  };

  const closeFile = async (path: string) => {
    try {
      // await closeFileAPI(path, access_token);
    } catch (err) {}
    removeFileUploading(path);
  };

  const uploadFileStart = async (path: string) => {
    const startWrite = await initializeFile(path);
    if (startWrite) {
      await sendBlobs(path);
      await closeFile(path);
    } else {
      await closeFile(path);
    }
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
