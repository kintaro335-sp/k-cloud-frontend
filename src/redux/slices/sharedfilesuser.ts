import { createSlice } from '@reduxjs/toolkit';
import { TokenElement } from '../../@types/sharedfiles';
import { dispatch } from '../store';

interface SharedfilesState {
  intervalP: number | null;
  intervalT: number | null;
  pages: number;
  page: number;
  tokens: TokenElement[];
}

const initialState: SharedfilesState = {
  intervalP: null,
  intervalT: null,
  page: 1,
  pages: 1,
  tokens: []
};

const slice = createSlice({
  name: 'sharedfilesuser',
  initialState,
  reducers: {
    setIntervalIdTokens(state, action) {
      state.intervalT = action.payload as number;
    },
    clearIntervalTokens(state) {
      if (state.intervalT === null) return;
      clearInterval(state.intervalT);
      state.intervalT = null;
    },
    setIntervalIdPages(state, action) {
      state.intervalP = action.payload as number;
    },
    clearIntervalPages(state) {
      if (state.intervalP === null) return;
      clearInterval(state.intervalP);
      state.intervalP = null;
    },
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

export function setIntervalIdPagesU(intervalId: number) {
  try {
    dispatch(slice.actions.setIntervalIdPages(intervalId));
  } catch (err) {
    console.error(err);
  }
}

export function clearIntervalPagesU() {
  try {
    dispatch(slice.actions.clearIntervalPages());
  } catch (err) {
    console.error(err);
  }
}

export function setIntervalIdTokensU(intervalId: number) {
  try {
    dispatch(slice.actions.setIntervalIdTokens(intervalId));
  } catch (err) {
    console.error(err);
  }
}

export function clearIntervalTokensU() {
  try {
    dispatch(slice.actions.clearIntervalTokens());
  } catch (err) {
    console.error(err);
  }
}

export function setPageU(page: number) {
  try {
    dispatch(slice.actions.setPage(page));
  } catch (err) {
    console.log(err);
  }
}

export function setPagesU(pages: number) {
  try {
    dispatch(slice.actions.setPages(pages));
  } catch (err) {
    console.log(err);
  }
}

export function setTokensU(tokens: TokenElement[]) {
  try {
    dispatch(slice.actions.setTokens(tokens));
  } catch (err) {
    console.log(err);
  }
}
