import React, { createContext, useEffect } from 'react';
import { useSelector, getState } from '../redux/store';
import {
  addFile,
  onWriteBlob,
  setInitializedFile,
  setTotalBlobs,
  setBlobsSended,
  removeFileUploading
} from '../redux/slices/fileUploader';
import { initializeFileAPI, uploadBlobAPI, closeFileAPI } from '../api/files';
import { getNumberBlobs, BLOB_SIZE } from '../utils/files';
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

  const initializeFile = async (path: string) => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    await initializeFileAPI(path, fileM.size, access_token).catch((err) => {
      if (isAxiosError(err)) {
        console.error(err);
      }
    });
    setInitializedFile(path);
    return;
  };

  const sendBlob = async (path: string, position: number, size: number) => {
    const files = getFilesState();
    const fileM = files.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blob = fileM.file.slice(position, position + size);
    await uploadBlobAPI(path, position, blob, access_token)
      .catch((err) => {
        if (isAxiosError(err)) {
          console.error(err);
        }
      })
      .then(() => {
        onWriteBlob(path, position, blob.size);
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
      const positionfrom = BLOB_SIZE * i;
      const positionto = BLOB_SIZE * (i + 1);
      await sendBlob(path, positionfrom, positionto - positionfrom);
      setBlobsSended(path, i);
    }
    return new Promise((res) => {
      res();
    });
  };

  const closeFile = async (path: string) => {
    await closeFileAPI(path, access_token).then(() => {
      removeFileUploading(path);
    });
  };

  const uploadFileStart = async (path: string) => {
    await initializeFile(path);
    await sendBlobs(path);
    await closeFile(path);
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
