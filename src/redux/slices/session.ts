import { createSlice } from '@reduxjs/toolkit';
import { Folder, FileI } from '../../@types/files';
import { TokenElement } from '../../@types/sharedfiles';

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
