import { createSlice } from '@reduxjs/toolkit';
import { TokenElement } from '../../@types/sharedfiles';
import { FileI } from '../../@types/files';
import { dispatch } from '../store';

interface TokenExplorerState {
  token: TokenElement | null;
  path: string;
  fileList: FileI[];
}

const initialState: TokenExplorerState = {
  token: null,
  path: '',
  fileList: []
};

const slice = createSlice({
  name: 'tokenexplorer',
  initialState,
  reducers: {
    setTokenId(state, action) {
      state.token = action.payload as TokenElement;
    },
    setPath(state, action) {
      state.path = action.payload as string;
    },
    setFileList(state, action) {
      state.fileList = action.payload as FileI[];
    }
  }
});

export default slice.reducer;

export function setTokenId(id: TokenElement) {
  try {
    dispatch(slice.actions.setTokenId(id));
  } catch (err) {
    console.error(err);
  }
}

export function setPath(path: string) {
  try {
    dispatch(slice.actions.setPath(path));
  } catch (err) {
    console.error(err);
  }
}

export function setFileList(fileList: FileI[]) {
  try {
    dispatch(slice.actions.setFileList(fileList));
  } catch (err) {
    console.error(err);
  }
}
