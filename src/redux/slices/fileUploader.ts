import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { FileToUpload, NewFile, BlobToWrite } from '../../@types/files';

interface initialStateT {
  filesDir: string[];
  files: Record<string, FileToUpload | null>;
  blobSize: number;
  uploading: number;
}

const initialState: initialStateT = {
  filesDir: [],
  files: {},
  blobSize: 1024,
  uploading: 0
};

const slice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile(state, action) {
      const { path, file } = action.payload as NewFile;
      if (file === null) return;
      const fileDir = `${path}/${file.name}`;
      state.files[fileDir] = {
        uploading: false,
        file,
        size: file.size,
        blobSended: [],
        sended: 0,
        written: 0,
        inicializado: false,
        totalBlobs: 0,
        blobsSended: 0,
        blobProgress: 0
      };
      if (!state.filesDir.includes(fileDir)) state.filesDir.push(fileDir);
    },
    onWriteBlob(state, action) {
      const { path, position, size } = action.payload as BlobToWrite;
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      fileM.sended += size;
      fileM.blobSended.push({ from: position, to: position + size });
    },
    initializeFile(state, action) {
      const path = action.payload as string;
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      state.uploading++;
      fileM.inicializado = true;
    },
    uploadingFile(state, action) {
      const path = action.payload as string;
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      fileM.uploading = true;
    },
    setTotalBlobs(state, action) {
      const { path, total } = action.payload as { path: string; total: number };
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      fileM.totalBlobs = total;
    },
    setBlobsSended(state, action) {
      const { path, sendedB } = action.payload as { path: string; sendedB: number };
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      fileM.blobsSended = sendedB;
      fileM.blobProgress = 0;
    },
    removeFileUploading(state, action) {
      const path = action.payload as string;
      state.filesDir = state.filesDir.filter((f) => f !== path);
      delete state.files[path];
      state.uploading--;
      if (state.uploading < 0) state.uploading = 0;
    },
    deleteCompletedFiles(state) {
      state.filesDir.forEach((dir) => {
        const fileT = state.files[dir];
        if (fileT === null || fileT === undefined) return;
        if (fileT.sended >= fileT.size && fileT.uploading === false) {
          delete state.files[dir];
          state.filesDir = state.filesDir.filter((d) => d !== dir);
        }
      });
    },
    setBlobProgress(state, action) {
      const { path, progress } = action.payload as { path: string; progress: number };
      const fileM = state.files[path];
      if (fileM === null || fileM === undefined) return;
      if(fileM.blobProgress > progress) return;
      fileM.blobProgress = progress > fileM.size  ? fileM.size : progress;
    },
    setWrittenProgress(state, action) {
      const { path, progress } = action.payload as { path: string; progress: number };
      const fileM = state.files[path];
      if (fileM === null || fileM === undefined) return;
      fileM.written = progress;
    }
  }
});

export default slice.reducer;

export function addFile(path: string, file: File | null) {
  try {
    dispatch(slice.actions.addFile({ path, file }));
  } catch (err) {
    console.error('file no added, try again');
  }
}

export function onWriteBlob(path: string, position: number, size: number) {
  try {
    dispatch(slice.actions.onWriteBlob({ path, position, size }));
  } catch (err) {
    console.error('file no added, try again');
  }
}

export function setInitializedFile(path: string) {
  try {
    dispatch(slice.actions.initializeFile(path));
  } catch (err) {
    console.error('file no added, try again');
  }
}

export function setUploadingFile(path: string) {
  try {
    dispatch(slice.actions.uploadingFile(path));
  } catch (err) {
    console.error('file no added, try again');
  }
}

export function setTotalBlobs(path: string, total: number) {
  try {
    dispatch(slice.actions.setTotalBlobs({ path, total }));
  } catch (err) {
    console.error(err);
  }
}

export function setBlobsSended(path: string, sendedB: number) {
  try {
    dispatch(slice.actions.setBlobsSended({ path, sendedB }));
  } catch (err) {
    console.error(err);
  }
}

export function removeFileUploading(path: string) {
  try {
    dispatch(slice.actions.removeFileUploading(path));
  } catch (err) {
    console.log(err);
  }
}

export function removeCompletedFiles() {
  try {
    dispatch(slice.actions.deleteCompletedFiles());
  } catch (err) {
    console.error(err);
  }
}

export function setBlobProgress(path: string, progress: number) {
  try {
    dispatch(slice.actions.setBlobProgress({ path, progress }));
  } catch (err) {
    console.error(err);
  }
}

export function setWrittenProgress(path: string, progress: number) {
  try {
    dispatch(slice.actions.setWrittenProgress({ path, progress }));
  } catch (err) {
    console.error(err);
  }
}
