import { createSlice } from '@reduxjs/toolkit';
import { TokenElement } from '../../@types/sharedfiles';
import { dispatch } from '../store';

interface SharedfilesState {
  pages: number;
  page: number;
  tokens: TokenElement[];
}

const initialState: SharedfilesState = {
  page: 1,
  pages: 1,
  tokens: []
};

const slice = createSlice({
  name: 'sharedfiles',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload as number;
    },
    setPages(state, action) {
      state.pages = action.payload as number;
    },
    setTokens(state, action) {
      state.tokens = action.payload as TokenElement[];
    }
  }
});

export default slice.reducer;

export function setPage(page: number) {
  try {
    dispatch(slice.actions.setPage(page));
  } catch (err) {
    console.log(err);
  }
}

export function setPages(pages: number) {
  try {
    dispatch(slice.actions.setPages(pages));
  } catch (err) {
    console.log(err);
  }
}

export function setTokens(tokens: TokenElement[]) {
  try {
    dispatch(slice.actions.setTokens(tokens));
  } catch (err) {
    console.log(err);
  }
}
