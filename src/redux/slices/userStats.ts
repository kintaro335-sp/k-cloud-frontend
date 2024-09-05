import { UsedSpaceType } from '../../@types/files';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

interface InitialState {
  filesStats: UsedSpaceType[];
}

const initialState: InitialState = {
  filesStats: []
};

const slice = createSlice({
  name: 'userstats',
  initialState,
  reducers: {
    setFilesStats: (state, action) => {
      state.filesStats = action.payload;
    }
  }
});

export default slice.reducer;

export function setFilesStats(filesStats: UsedSpaceType[]) {
  try {
    dispatch(slice.actions.setFilesStats(filesStats));
  } catch (e) {
    console.error(e);
  }
}
