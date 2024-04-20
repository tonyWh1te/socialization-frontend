import { configureStore } from '@reduxjs/toolkit';
import { authFormReducer, loginListener } from '../modules/Auth';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    auth: authFormReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(loginListener.middleware).concat(apiSlice.middleware),
});

export default store;
