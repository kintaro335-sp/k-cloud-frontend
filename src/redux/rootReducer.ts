import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import sessionReducer from './slices/session';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['session']
};

const sessionPersistConfig = {
  key: 'session',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['acces_token']
};

const rootReducer = combineReducers({
  session: persistReducer(sessionPersistConfig, sessionReducer)
});

export { rootPersistConfig, rootReducer };
