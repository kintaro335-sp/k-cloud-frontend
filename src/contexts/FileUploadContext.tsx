import React, { createContext, useEffect, useRef, useState, useCallback } from 'react';
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
import { FileToUpload } from '../@types/files';

const getFilesState = () => getState().files;
export const FileUploadContext = createContext({ uploadFile: (path: string, file: File | null) => {} });

export default function FileUploadC({ children }: { children: React.ReactNode }) {
  // const { enqueueSnackbar } = useSnackbar();
  const socketClient = useRef(createNewSocket());
  const { access_token, path } = useSelector((state) => state.session);
  const { filesDir } = useSelector((state) => state.files);
  const [block, setBlock] = useState(false);

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
              socketClient.current.emit('new-file');
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

  const sendBlob = async (path: string, position: number, size: number, fileM: FileToUpload): Promise<number> => {
    if (fileM === null) return 0;
    if (fileM === undefined) return 0;
    const blob = fileM.file.slice(position, position + size);
    return new Promise((resolve) => {
      uploadBlobAPI(path, position, blob, access_token, (p) => {
        setBlobProgress(path, p);
      })
        .catch((err) => {
          if (isAxiosError(err)) {
            console.error(err);
          }
          resolve(0);
        })
        .then(() => {
          onWriteBlob(path, position, blob.size);
          resolve(1);
        });
    });
  };

  const sendBlobs = async (dir: string, fileM: FileToUpload): Promise<void> => {
    setUploadingFile(dir);
    if (fileM === null) return;
    if (fileM === undefined) return;
    const blobs = getNumberBlobs(fileM.size);
    setTotalBlobs(dir, blobs);
    for (let i = 0; i < blobs; i++) {
      const positionfrom = BLOB_SIZE * i;
      const positionto = BLOB_SIZE * (i + 1);
      const t = await sendBlob(dir, positionfrom, positionto - positionfrom, fileM);
      setBlobsSended(dir, i + 1);
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

  const startUpload = useCallback(() => {
    if (block) return;
    setBlock(true);
    const state = getFilesState();
    state.filesDir.slice(0, 5).forEach((dir) => {
      const fileM = state.files[dir];
      const typef = typeof fileM;
      if (typef === 'undefined' || fileM === null) return;
      if (!fileM.inicializado && !fileM.uploading && state.uploading < 5) {
        initializeFile(dir).then((r) => {
          if (r) {
            sendBlobs(dir, fileM).then(() => {
              closeFile(dir);
            });
          }
        });
      }
    });
    setBlock(false);
  }, [block]);

  useEffect(() => {
    socketClient.current.emit('new-file');
  }, [filesDir]);

  useEffect(() => {
    socketClient.current.removeListener('file-upload');
    socketClient.current.on('file-upload', () => {
      const state = getFilesState();
      if (state.filesDir.length !== 0 && state.uploading < 5) startUpload();
    });
  }, [startUpload, socketClient.current]);

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('upload-update', (data) => {
      setWrittenProgress(data.path, data.fileStatus.saved);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token, path]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
