import { createSlice } from '@reduxjs/toolkit';

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
