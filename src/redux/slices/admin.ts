import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { AdminState, User } from '../../@types/admin';

const initialState: AdminState = {
  userInterval: null,
  users: []
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIntervalIdUser: (state, action) => {
      const numberId = action.payload as number;
      state.userInterval = numberId;
    },
    clearIntervalUser(state) {
      if(state.userInterval === null) return;
      clearInterval(state.userInterval);
      state.userInterval = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

export default slice.reducer;

export function clearIntervalUser() {
  try {
    dispatch(slice.actions.clearIntervalUser());
  } catch (err) {
    console.error(err);
  }
}

export function setIntervalUser(id: number) {
  try {
    dispatch(slice.actions.setIntervalIdUser(id));
  } catch (err) {
    console.error(err);
  }
}

export function setUsers(users: User[]) {
  try {
    dispatch(slice.actions.setUsers(users));
  } catch (err) {
    console.error(err);
  }
}
