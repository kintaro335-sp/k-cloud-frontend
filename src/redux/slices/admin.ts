import { createSlice } from '@reduxjs/toolkit';
import { AdminState } from '../../@types/admin';

const initialState: AdminState = {
  users: []
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

export const { setUsers } = slice.actions;

export default slice.reducer;
