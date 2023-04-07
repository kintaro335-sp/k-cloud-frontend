import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { UsedSpaceType } from '../../@types/files';
import { UsedSpaceUser } from '../../@types/admin';

interface StatsState {
  totalSpace: number;
  usedSpace: number;
  spaceUsedFiles: UsedSpaceType[];
  spaceUsedUsers: UsedSpaceUser[];
}

const initialState: StatsState = {
  totalSpace: 0,
  usedSpace: 0,
  spaceUsedFiles: [],
  spaceUsedUsers: []
};

const slice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setTotal(state, action) {
      state.totalSpace = action.payload as number;
    },
    setUsed(state, action) {
      state.usedSpace = action.payload as number;
    },
    setUsedSpaceFiles(state, action) {
      state.spaceUsedFiles = action.payload as UsedSpaceType[];
    },
    setUsedSpaceUsers(state, action) {
      state.spaceUsedUsers = action.payload as UsedSpaceUser[];
    }
  }
});

export default slice.reducer;

export function setTotal(total: number) {
  try {
    dispatch(slice.actions.setTotal(total));
  } catch (err) {
    console.error(err);
  }
}

export function setUsed(used: number) {
  try {
    dispatch(slice.actions.setUsed(used));
  } catch (err) {
    console.error(err);
  }
}

export function setUsedSpaceUsers(data: UsedSpaceUser[]) {
  try {
    dispatch(slice.actions.setUsedSpaceUsers(data));
  } catch (err) {
    console.error(err);
  }
}

export function setUsedSpaceFiles(data: UsedSpaceType[]) {
  try {
    dispatch(slice.actions.setUsedSpaceFiles(data));
  } catch (err) {
    console.error(err);
  }
}
