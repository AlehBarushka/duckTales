import {configureStore} from '@reduxjs/toolkit';

import barReducer from './slices/barSlice';

export const store = configureStore({
  reducer: {
    bar: barReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
