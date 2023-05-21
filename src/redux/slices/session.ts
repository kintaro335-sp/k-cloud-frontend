import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Folder, FileI } from '../../@types/files';
import { TokenElement } from '../../@types/sharedfiles';

export interface SessionState {
  access_token: string;
  path: string;
  files: FileI[];
  tree: Array<Folder | FileI>;
  fileInterval: number | null;
  tokenInterval: number | null;
  tokens: TokenElement[];
}

const initialState: SessionState = {
  access_token: '',
  path: '',
  files: [],
  tree: [],
  fileInterval: null,
  tokenInterval: null,
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
    setIntervalId(state, action) {
      const number = action.payload as number;
      state.fileInterval = number;
    },
    clearIntervalFile(state) {
      if (state.fileInterval !== null) {
        clearInterval(state.fileInterval);
        state.fileInterval = null;
      }
    },
    setIntervalIdToken(state, action) {
      const number = action.payload as number;
      state.tokenInterval = number;
    },
    clearIntervalToken(state) {
      if (state.tokenInterval !== null) {
        clearInterval(state.tokenInterval);
        state.fileInterval = null;
      }
    },
    setTokens(state, action) {
      state.tokens = action.payload as TokenElement[];
    }
  }
});

export const { setAccessToken, setPath, setFiles, setTree, setTokens } = slice.actions;

export default slice.reducer;

export function onSetInterval(id: number) {
  try {
    dispatch(slice.actions.setIntervalId(id));
  } catch (err) {
    console.error;
  }
}

export function cancelFilesInterval() {
  try {
    dispatch(slice.actions.clearIntervalFile());
  } catch (err) {
    console.error(err);
  }
}
export function onSetTokenInterval(id: number) {
  try {
    dispatch(slice.actions.setIntervalIdToken(id));
  } catch (err) {
    console.error;
  }
}

export function cancelTokenInterval() {
  try {
    dispatch(slice.actions.clearIntervalToken());
  } catch (err) {
    console.error(err);
  }
}