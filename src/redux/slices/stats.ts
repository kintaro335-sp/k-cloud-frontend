import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { UsedSpaceType } from '../../@types/files';
import { UsedSpaceUser } from '../../@types/admin';
import { StatsLineChart } from '../../@types/stats';

interface StatsState {
  totalSpace: number;
  usedSpace: number;
  spaceUsedFiles: UsedSpaceType[];
  spaceUsedUsers: UsedSpaceUser[];
  activityActions: StatsLineChart;
  activityStatus: StatsLineChart;
  activityReason: StatsLineChart;
  memoryUsageH: StatsLineChart;
}

const initialState: StatsState = {
  totalSpace: 0,
  usedSpace: 0,
  spaceUsedFiles: [],
  spaceUsedUsers: [],
  activityActions: [],
  activityReason: [],
  activityStatus: [],
  memoryUsageH: []
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
    },
    setActivityActions(state, action) {
      state.activityActions = action.payload as StatsLineChart;
    },
    setActivityReason(state, action) {
      state.activityReason = action.payload as StatsLineChart;
    },
    setActivityStatus(state, action) {
      state.activityStatus = action.payload as StatsLineChart;
    },
    setMemoryUsageH(state, action) {
      state.memoryUsageH = action.payload as StatsLineChart;
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

export function setActivityActions(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityActions(data));
  } catch (err) {
    console.error(err);
  }
}

export function setActivityReason(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityReason(data));
  } catch (err) {
    console.error(err);
  }
}

export function setActivityStatus(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityStatus(data));
  } catch (err) {
    console.error(err);
  }
}

export function setMemoryUsageH(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setMemoryUsageH(data));
  } catch (err) {
    console.error(err);
  }
}
