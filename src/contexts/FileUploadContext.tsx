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
    console.log(path)
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
    if (blobs === 1) {
      const b = await uploadFileAPI(dir, fileM.file, access_token);
    } else {
      for (let i = 0; i < blobs; i++) {
        const positionfrom = BLOB_SIZE * i;
        const positionto = BLOB_SIZE * (i + 1);
        const t = await sendBlob(dir, positionfrom, positionto - positionfrom, fileM);
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
      startUpload();
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const startUpload = () => {
    const state = getFilesState();
    if (state.uploading > 5) return;
    const filesS = state.filesDir.slice(0, 5);

    return new Promise((res) => {
      filesS.forEach((dir, i) => {
        const fileM = state.files[dir];
        if (fileM === undefined || fileM === null) return;
        if (!fileM.inicializado) {
          initializeFile(dir).then((r) => {
            if (r) {
              sendBlobs(dir, fileM).then(() => {
                closeFile(dir);
                if (i === 4) {
                  res(1);
                }
              });
            }
          });
        }
      });
    });
  };

  const uploadFile = (path: string, file: File | null) => {
    if (file === null) return;
    addFile(path, file);
    startUpload();
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
