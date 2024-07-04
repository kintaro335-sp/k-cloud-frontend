import { createSlice } from '@reduxjs/toolkit';
import { Folder, FileI } from '../../@types/files';
import { TokenElement } from '../../@types/sharedfiles';
import { orderBy } from 'lodash';
import { dispatch } from '../store';

export interface SessionState {
  access_token: string;
  path: string;
  files: FileI[];
  tree: Array<Folder | FileI>;
  tokens: TokenElement[];
}

const initialState: SessionState = {
  access_token: '',
  path: '',
  files: [],
  tree: [],
  tokens: []
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    addFile: (state, action) => {
      if (state.files.find((f) => f.name === action.payload.name)) {
        return;
      }
      state.files.push(action.payload as FileI);
    },
    substituteFile(state, action) {
      const file = action.payload as FileI;
      state.files = state.files.map((f) => (f.name === file.name ? file : f));
    },
    setTree(state, action) {
      const treeL = action.payload as Array<Folder | FileI>;
      state.tree = treeL;
    },
    setTokens(state, action) {
      state.tokens = action.payload as TokenElement[];
    }
  }
});

export const { setAccessToken, setPath, setFiles, setTree, setTokens } = slice.actions;

export default slice.reducer;

export function addFile(file: FileI) {
  try {
    dispatch(slice.actions.addFile(file));
  } catch (e) {}
}

export function substituteFile(file: FileI) {
  try {
    dispatch(slice.actions.substituteFile(file));
  } catch (e) {}
}
