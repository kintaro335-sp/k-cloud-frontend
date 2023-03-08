import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

interface StatsState {
  totalSpace: number;
  usedSpace: number;
}

const initialState: StatsState = {
  totalSpace: 0,
  usedSpace: 0
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
