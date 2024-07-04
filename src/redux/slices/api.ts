import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { ApiKey, Session } from '../../@types/apikeys';

interface InitialStateApi {
  apiKeys: ApiKey[];
  sessions: Session[];
}

const initialState: InitialStateApi = {
  apiKeys: [],
  sessions: []
};

const slice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiKeys(state, action) {
      state.apiKeys = action.payload as ApiKey[];
    },
    setSessions(state, action) {
      state.sessions = action.payload as Session[];
    }
  }
});

export default slice.reducer;

export function setApiKeys(apiKeys: ApiKey[]) {
  try {
    dispatch(slice.actions.setApiKeys(apiKeys));
  } catch (err) {
    console.error(err);
  }
}

export function setSessions(sessions: Session[]) {
  try {
    dispatch(slice.actions.setSessions(sessions));
  } catch (err) {
    console.error(err);
  }
}
