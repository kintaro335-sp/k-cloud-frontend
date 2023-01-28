import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
//
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer)
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const useDispatch = () => useReduxDispatch<AppDispatch>();

const { dispatch } = store;

export { store, dispatch, persistor, useSelector, useDispatch };
