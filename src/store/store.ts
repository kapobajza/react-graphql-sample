import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices';

const reducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer,
  devTools: false,
});

export const storeTest = configureStore({
  reducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Store = typeof store;
