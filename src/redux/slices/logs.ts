import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { LogR } from '../../@types/admin';

interface InitialStateI {
  logsIntervalId: number | null;
  logs: LogR[];
  page: number;
  pages: number;
}

const initialState: InitialStateI = {
  logsIntervalId: null,
  logs: [],
  page: 1,
  pages: 1
};

const slice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs(state, action) {
      state.logs = action.payload as LogR[];
    },
    setPage(state, action) {
      state.page = action.payload as number;
    },
    setPages(state, action) {
      state.pages = action.payload as number;
    },
    setIntervalLogsId(state, action) {
      state.logsIntervalId = action.payload as number;
    },
    clearIntervalLogsId(state) {
      if (state.logsIntervalId !== null) {
        clearInterval(state.logsIntervalId);
        state.logsIntervalId = null;
      }
    }
  }
});

export default slice.reducer;

export function setLogs(logs: LogR[]) {
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

export function setIntervalLogsId(idInterval: number) {
  try {
    dispatch(slice.actions.setIntervalLogsId(idInterval));
  } catch (err) {
    console.error(err);
  }
}

export function clearIntervalLogsId() {
  try {
    dispatch(slice.actions.clearIntervalLogsId());
  } catch (err) {
    console.error(err);
  }
}
