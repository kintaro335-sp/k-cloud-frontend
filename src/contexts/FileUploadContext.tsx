import React, { createContext, useEffect, useRef, useCallback, useMemo } from 'react';
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
// import { useSnackbar } from 'notistack';
import { createNewSocket } from '../api/websocket';

const getFilesState = () => getState().files;
export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  // const { enqueueSnackbar } = useSnackbar();
  const socketClient = useRef(createNewSocket());
  const { access_token, path } = useSelector((state) => state.session);
  const { filesDir } = useSelector((state) => state.files);

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
  };

  const initializeFile = async (path: string): Promise<boolean> => {
    const state = getFilesState();
    const fileM = state.files[path];
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
              //enqueueSnackbar('archivo ya existe', { variant: 'error' });
              removeFileUploading(path);
            }
            if (err.response?.status === 403) {
              setInitializedFile(path);
              resolve(true);
            }
          }
          resolve(false);
        });
    });
  };

  const sendBlob = async (path: string, position: number, size: number): Promise<void> => {
    const state = getFilesState();
    const fileM = state.files[path];
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
    setUploadingFile(path);
    const state = getFilesState();
    const fileM = state.files[path];
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blobs = getNumberBlobs(fileM.size);
    setTotalBlobs(path, blobs);
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
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const startUpload = () => {
    const state = getFilesState();
    state.filesDir.forEach((dir) => {
      const fileM = state.files[dir];
      if (fileM === null) return;
      if (fileM === undefined) return;
      if (fileM.inicializado && !fileM.uploading && state.uploading < 5) {
        initializeFile(dir).then((r) => {
          if (r) {
            sendBlobs(dir).then(() => {
              closeFile(dir);
            });
          }
        });
      }
    });
  };

  // effect to init files
  useEffect(() => {
    filesDir.forEach((dir) => {
      const files = getFilesState();
      const fileM = files.files[dir];
      if (fileM === null) return;
      if (fileM === undefined) return;
      if (!fileM.inicializado) {
        initializeFile(dir).then((r) => {
          if (r) {
            sendBlobs(dir).then(() => {
              closeFile(dir);
            });
          }
        });
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
      const state = getFilesState()
      if (state.filesDir.length !== 0 && state.uploading < 5) startUpload();
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token, path]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
