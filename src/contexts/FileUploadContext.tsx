import React, { createContext, useEffect, useRef } from 'react';
import { useSelector, getState } from '../redux/store';
import {
  addFile,
  onWriteBlob,
  setInitializedFile,
  setTotalBlobs,
  setBlobsSended,
  removeFileUploading,
  setBlobProgress,
  setWrittenProgress,
  setUploadingFile
} from '../redux/slices/fileUploader';
import { initializeFileAPI, uploadBlobAPI } from '../api/files';
import { getNumberBlobs, BLOB_SIZE } from '../utils/files';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { createNewSocket } from '../api/websocket';

export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const socketClient = useRef(createNewSocket());
  const { access_token, path } = useSelector((state) => state.session);
  const { filesDir, files } = useSelector((state) => state.files);

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
          setInitializedFile(path);
          resolve(true);
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            if (err.response?.status === 400) {
              // enqueueSnackbar('archivo ya existe', { variant: 'error' });
            }
          }
          removeFileUploading(path)
          resolve(false);
        });
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
    setUploadingFile(path);
    for (let i = 0; i < blobs; i++) {
      const positionfrom = BLOB_SIZE * i;
      const positionto = BLOB_SIZE * (i + 1);
      await sendBlob(path, positionfrom, positionto - positionfrom);
      setBlobsSended(path, i + 1);
    }
    return new Promise((res) => {
      res();
    });
  };

  const closeFile = async (path: string) => {
    try {
      removeFileUploading(path);
      if (getState().files.filesDir.length > 0) {
        startUpload();
      }
    } catch (err) {
      console.error(err);
    }
    return;
  };

  function startUpload() {
    getState().files.filesDir.forEach((dir) => {
      const files = getFilesState();
      const fileM = files.files[dir];
      if (fileM === null) return;
      if (fileM === undefined) return;
      if (fileM.inicializado && !fileM.uploading && getState().files.uploading < 10) {
        sendBlobs(dir).then(() => {
          closeFile(dir);
        });
      }
    });
  }

  // effect to init files
  useEffect(() => {
    filesDir.forEach((dir) => {
      const files = getFilesState();
      const fileM = files.files[dir];
      if (fileM === null) return;
      if (fileM === undefined) return;
      if (!fileM.inicializado) {
        initializeFile(dir);
      }
    });
  }, [filesDir]);

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('upload-update', (data) => {
      setWrittenProgress(data.path, data.fileStatus.saved);
    });
    newSocket.on('file-upload', () => {
      if (getState().files.filesDir.length !== 0) startUpload();
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token, path]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
