import { createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  access_token: string;
  path: string;
}

const initialState = {
  access_token: '',
  path: ''
}

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    }
  }
});


export const { setAccessToken, setPath } = slice.actions;

export default slice.reducer;
