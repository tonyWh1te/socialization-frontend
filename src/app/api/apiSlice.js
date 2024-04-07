import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../modules/AuthForm';

const API_URL = 'http://localhost:3000';

// при каждом запросе передаем токен
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// оболочка над базовым запросом, где в случае сбоя перезапросим access токен
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    console.log('refreshResult', refreshResult);

    // если запрос прошел успешно, обновляем токен
    if (refreshResult?.data) {
      const { user } = api.getState().auth;

      api.dispatch(setCredentials({ ...user, token: refreshResult.data.token }));

      // повторяем запрос с обновленным токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// eslint-disable-next-line
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
