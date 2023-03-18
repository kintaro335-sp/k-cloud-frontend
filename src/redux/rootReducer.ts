import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import sessionReducer from './slices/session';
import adminReducer from './slices/admin';
import fileUploaderReducer from './slices/fileUploader';
import statsReducer from './slices/stats';
import sharedfilesReducer from './slices/sharedfiles';
import tokenexplorerReducer from './slices/tokenexplorer';
import sharedfileReducer from './slices/sharedfile';

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
  session: persistReducer(sessionPersistConfig, sessionReducer),
  admin: adminReducer,
  files: fileUploaderReducer,
  stats: statsReducer,
  sharedfiles: sharedfilesReducer,
  sharedfile: sharedfileReducer,
  tokenexplorer: tokenexplorerReducer
});

export { rootPersistConfig, rootReducer };
