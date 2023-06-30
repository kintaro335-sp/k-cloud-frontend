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
  activityMethods: StatsLineChart;
  activityStatuscode: StatsLineChart;
  activityRoute: StatsLineChart;
  memoryUsageH: StatsLineChart;
  memoryUsageInterval: number | null;
}

const initialState: StatsState = {
  totalSpace: 0,
  usedSpace: 0,
  spaceUsedFiles: [],
  spaceUsedUsers: [],
  activityMethods: [],
  activityRoute: [],
  activityStatuscode: [],
  memoryUsageH: [],
  memoryUsageInterval: null
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
    setActivityMethods(state, action) {
      state.activityMethods = action.payload as StatsLineChart;
    },
    setActivityRoute(state, action) {
      state.activityRoute = action.payload as StatsLineChart;
    },
    setActivityStatuscode(state, action) {
      state.activityStatuscode = action.payload as StatsLineChart;
    },
    setMemoryUsageH(state, action) {
      state.memoryUsageH = action.payload as StatsLineChart;
    },
    setMemoryUsageInterval(state, action) {
      state.memoryUsageInterval = action.payload as number;
    },
    clearIntervalMemUsage(state) {
      if (state.memoryUsageInterval !== null) {
        clearInterval(state.memoryUsageInterval);
        state.memoryUsageInterval = null;
      }
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

export function setActivityMethods(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityMethods(data));
  } catch (err) {
    console.error(err);
  }
}

export function setActivityRoute(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityRoute(data));
  } catch (err) {
    console.error(err);
  }
}

export function setActivityStatuscode(data: StatsLineChart) {
  try {
    dispatch(slice.actions.setActivityStatuscode(data));
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

export function setMemoryInterval(idInterval: number) {
  try {
    dispatch(slice.actions.setMemoryUsageInterval(idInterval));
  } catch (err) {
    console.error(err);
  }
}

export function clearIntervalMemUsage() {
  try {
    dispatch(slice.actions.clearIntervalMemUsage());
  } catch (err) {
    console.error(err);
  }
}
