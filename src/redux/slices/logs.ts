import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { SharedFileActivity } from '../../@types/admin';

interface InitialStateI {
  logs: SharedFileActivity[];
  page: number;
  pages: number;
}

const initialState: InitialStateI = {
  logs: [],
  page: 1,
  pages: 1
};

const slice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs(state, action) {
      state.logs = action.payload as SharedFileActivity[];
    },
    setPage(state, action) {
      state.page = action.payload as number;
    },
    setPages(state, action) {
      state.pages = action.payload as number;
    }
  }
});

export default slice.reducer;

export function setLogs(logs: SharedFileActivity[]) {
  try {
    dispatch(slice.actions.setLogs(logs));
  } catch (err) {
    console.error(err);
  }
}

export function setPage(page: number) {
  try {
    dispatch(slice.actions.setPage(page));
  } catch (err) {
    console.error(err);
  }
}

export function setPages(pages: number) {
  try {
    dispatch(slice.actions.setPages(pages));
  } catch (err) {
    console.error(err);
  }
}
