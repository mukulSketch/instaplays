import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import appStatusReducer from './slice';

const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable serializability check
});

export const store = configureStore({
  reducer: {appStatus: appStatusReducer},
  middleware,
});
