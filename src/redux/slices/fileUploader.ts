import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { FileToUpload, NewFile, BlobToWrite } from '../../@types/files';

interface initialStateT {
  filesDir: string[];
  files: Record<string, FileToUpload | null>;
  blobSize: number;
}

const initialState: initialStateT = {
  filesDir: [],
  files: {},
  blobSize: 1024
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
        inicializado: false
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
      fileM.inicializado = true;
    },
    uploadingFile(state, action) {
      const path = action.payload as string;
      const fileM = state.files[path];
      if (fileM === null) return;
      if (fileM === undefined) return;
      fileM.uploading = true;
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