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
import { initializeFileAPI, uploadBlobAPI, uploadFileAPI } from '../api/files';
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
  const { uploading } = useSelector((state) => state.files);

  const initializeFile = async (path: string): Promise<boolean> => {
    const state = getFilesState();
    const fileM = state.files[path];
    if (fileM === null) return false;
    if (fileM === undefined) return false;
    return new Promise((resolve) => {
      if (fileM.size > BLOB_SIZE) {
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
                resolve(false);
              }
            }
            resolve(false);
          });
      } else {
        setInitializedFile(path);
        resolve(true);
      }
    });
  };

  const sendBlob = async (path: string, position: number, size: number, file: File): Promise<number> => {
    const blob = file.slice(position, position + size);
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

  const sendBlobs = async (dir: string, fileM: FileToUpload, file: File): Promise<void> => {
    setUploadingFile(dir);
    const blobs = getNumberBlobs(fileM.size);
    setTotalBlobs(dir, blobs);
    if (blobs === 1) {
      const b = await uploadFileAPI(dir, file, access_token, (p) => {
        setBlobProgress(dir, p)
      });
    } else {
      for (let i = 0; i < blobs; i++) {
        const positionfrom = BLOB_SIZE * i;
        const positionto = BLOB_SIZE * (i + 1);
        const t = await sendBlob(dir, positionfrom, positionto - positionfrom, file);
        setBlobsSended(dir, i + 1);
      }
    }
    return new Promise((res) => {
      res();
    });
  };

  const closeFile = (path: string) => {
    try {
      removeFileUploading(path);
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const startUpload = (path: string, file: File) => {
    initializeFile(path).then((r) => {
      if (r) {
        const fileM = getState().files.files[path];
        // @ts-ignore
        sendBlobs(path, fileM, file).then(() => {
          closeFile(path);
        });
      }
    });
  };

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
    const filePath = `${path}/${file.name}`;
    startUpload(filePath, file);
  };

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.removeListener('upload-update');
    newSocket.on('upload-update', (data) => {
      setWrittenProgress(data.path, data.fileStatus.saved);
    });
    socketClient.current = newSocket;
  }, [uploading, path]);

  return <FileUploadContext.Provider value={{ uploadFile }}>{children}</FileUploadContext.Provider>;
}
