import { createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  access_token: string;
}

const initialState = {
  access_token: ''
}

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    }
  }
});


export const { setAccessToken } = slice.actions;

export default slice.reducer;
