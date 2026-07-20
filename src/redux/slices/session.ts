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
  access_token: string;
  path: string;
  start: number;
  showQ: number;
  files: FileI[];
  tree: Array<Folder | FileI>;
  tokens: TokenElement[];
}

const initialState: SessionState = {
  access_token: '',
  path: '',
  start: 0,
  showQ: 48,
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
    }
  }
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
