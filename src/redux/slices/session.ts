import { createSlice } from '@reduxjs/toolkit';
import { FileP } from '../../api/files';
export interface SessionState {
  access_token: string;
  path: string;
  files: FileP[];
}

const initialState = {
  access_token: '',
  path: '',
  files: []
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
    }
  }
});

export const { setAccessToken, setPath, setFiles } = slice.actions;

export default slice.reducer;
