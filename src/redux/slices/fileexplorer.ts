/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { createSlice } from '@reduxjs/toolkit';
import { Folder, FileI } from '../../@types/files';
import { TokenElement } from '../../@types/sharedfiles';
import { dispatch } from '../store';


export interface SessionState {
  path: string;
  start: number;
  showQ: number;
  files: FileI[];
  tree: Array<Folder | FileI>;
  tokens: TokenElement[];
}

const initialState: SessionState = {
  path: '',
  start: 0,
  showQ: 48,
  files: [],
  tree: [],
  tokens: []
};

const slice = createSlice({
  name: 'fileexplorer',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setShowQ: (state, action) => {
      state.showQ = action.payload;
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

export default slice.reducer;

export function setPath(path: string) {
  try {
    dispatch(slice.actions.setPath(path));
  } catch (err) {
    console.error(err);
  }
}

export function setStart(start: number) {
  try {
    dispatch(slice.actions.setStart(start));
  } catch (err) {
    console.error(err);
  }
}

export function setShowQ(showQ: number) {
  try {
    dispatch(slice.actions.setShowQ(showQ));
  } catch (err) {
    console.error(err);
  }
}

export function setTree(tree: Array<Folder | FileI>) {
  try {
    dispatch(slice.actions.setTree(tree));
  } catch (e) {}
}

export function setFiles(files: FileI[]) {
  try {
    dispatch(slice.actions.setFiles(files));
  } catch (e) {}
}


export function setTokens(tokens: TokenElement[]) {
  try {
    dispatch(slice.actions.setTokens(tokens));
  } catch (err) {
    console.log(err);
  }
}

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



