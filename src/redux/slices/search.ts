/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { IndexList } from '../../@types/files';

interface SearchState {
  list: IndexList;
}

const initialState: SearchState = {
  list: []
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    }
  }
});

export default slice.reducer;

export function setList(list: IndexList) {
  try {
    dispatch(slice.actions.setList(list));
  } catch (err) {
    console.error(err);
  }
}
