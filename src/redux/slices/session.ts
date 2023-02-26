import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { FileP } from '../../api/files';
export interface SessionState {
  access_token: string;
  path: string;
  files: FileP[];
  fileInterval: number | null;
}

const initialState: SessionState = {
  access_token: '',
  path: '',
  files: [],
  fileInterval: null
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
    setIntervalId(state, action) {
      const number = action.payload as number;
      state.fileInterval = number;
    },
    clearIntervalFile(state) {
      if (state.fileInterval !== null) {
        clearInterval(state.fileInterval);
        state.fileInterval = null;
      }
    }
  }
});

export const { setAccessToken, setPath, setFiles } = slice.actions;

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
