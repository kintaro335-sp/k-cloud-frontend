import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { FileToUpload, NewFile } from '../../@types/files';

interface initialStateT {
  filesDir: string[];
  files: Record<string, FileToUpload | null>;
}

const initialState: initialStateT = {
  filesDir: [],
  files: {}
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
        file,
        size: file.size,
        blobSended: [],
        sended: 0,
        inicializado: false
      };
      state.filesDir.push(fileDir);
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
