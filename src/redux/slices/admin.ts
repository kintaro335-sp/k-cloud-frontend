import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { AdminState, User } from '../../@types/admin';

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

export default slice.reducer;

export function setUsers(users: User[]) {
  try {
    dispatch(slice.actions.setUsers(users));
  } catch (err) {
    console.error(err);
  }
}
