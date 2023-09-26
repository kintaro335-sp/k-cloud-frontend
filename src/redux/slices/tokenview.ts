import { createSlice } from '@reduxjs/toolkit';
import { SFInfoResponse } from '../../@types/sharedfiles';
import { FileI } from '../../@types/files';
import { dispatch } from '../store';

interface SharedFileState {
  path: string;
  info: SFInfoResponse | null;
  content: FileI[];
}

const initialState: SharedFileState = {
  path: '',
  info: null,
  content: []
};

const slice = createSlice({
  name: 'tokenview',
  initialState,
  reducers: {
    setPath(state, action) {
      state.path = action.payload as string;
    },
    setInfo(state, action) {
      state.info = action.payload as SFInfoResponse;
    },
    setContent(state, action) {
      state.content = action.payload as FileI[];
    }
  }
});

export default slice.reducer;

export function setPath(newPath: string) {
  try {
    dispatch(slice.actions.setPath(newPath));
  } catch (err) {
    console.error(err);
  }
}

export function setInfo(newInfo: SFInfoResponse | null) {
  try {
    dispatch(slice.actions.setInfo(newInfo));
  } catch (err) {
    console.error(err);
  }
}

export function setContent(content: FileI[]) {
  try {
    dispatch(slice.actions.setContent(content));
  } catch (err) {
    console.error(err);
  }
}
