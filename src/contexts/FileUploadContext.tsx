import React, { createContext, useEffect } from 'react';
import { useSelector, getState, useDispatch } from '../redux/store';
import {
  addFile,
  onWriteBlob,
  setInitializedFile,
  setTotalBlobs,
  setBlobsSended,
  removeFileUploading,
  setBlobProgress,
  setWrittenProgress
} from '../redux/slices/fileUploader';
import { setFiles } from '../redux/slices/session';
import { initializeFileAPI, uploadBlobAPI, statusFileAPI, getListFiles } from '../api/files';
import { getNumberBlobs, BLOB_SIZE } from '../utils/files';
import { timeOutIf } from '../utils/promises';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';

export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { access_token, path } = useSelector((state) => state.session);
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
            if (err.response?.status === 400) {
              enqueueSnackbar('Espacio Insuficiente', { variant: 'error' });
            }
          }
          resolve(false);
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
      uploadBlobAPI(path, position, blob, access_token, (p) => {
        setBlobProgress(path, p);
      })
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
    for (let i = 0; i < blobs; i++) {
      let pass = false;
      const positionfrom = BLOB_SIZE * i;
      const positionto = BLOB_SIZE * (i + 1);
      const n = await sendBlob(path, positionfrom, positionto - positionfrom);
      setBlobsSended(path, i + 1);
      const backendStatus = await statusFileAPI(path, access_token);
      if (backendStatus !== null) {
        setWrittenProgress(path, backendStatus.saved);
        pass = backendStatus.blobsNum <= 3;
      }
      while (!pass) {
        const backendStatus = await statusFileAPI(path, access_token);
        if (backendStatus !== null) {
          setWrittenProgress(path, backendStatus.saved);
          const applyTimeout = backendStatus.blobsNum === 0;
          await timeOutIf(1000, () => !applyTimeout);
          pass = applyTimeout;
        } else {
          break;
        }
      }
    }
    return new Promise((res) => {
      res();
    });
  };

  const closeFile = async (path: string) => {
    try {
      removeFileUploading(path);
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const uploadFileStart = async (path: string) => {
    const startWrite = await initializeFile(path);
    if (startWrite) {
      await sendBlobs(path);
    }
    await closeFile(path);
    const listFiles = await getListFiles(path, access_token);
    dispatch(setFiles(listFiles.list));
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
