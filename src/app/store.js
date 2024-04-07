import { configureStore } from '@reduxjs/toolkit';
import { authFormReducer } from '../modules/AuthForm';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    auth: authFormReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
