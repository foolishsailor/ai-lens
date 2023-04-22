import { configureStore } from '@reduxjs/toolkit';

import applicationSlice from './applicationSlice/slice';

const store = configureStore({
  reducer: {
    application: applicationSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
