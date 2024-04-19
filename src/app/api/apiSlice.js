import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateToken, logout } from '../../modules/AuthForm';

const API_URL = 'https://abb84c0f7ff172d6.mokky.dev';
// const API_URL =
//   process.env.NODE_ENV === 'development' ? 'api-sozialization' : 'http://5.35.89.117:8084';

// при каждом запросе передаем токен
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const { access } = getState().auth;

    console.log('endpoint', endpoint);
    console.log('prepareHeaders', access);

    if (access) {
      headers.set('Authorization', `JWT ${access}`);
    }

    return headers;
  },
});

// оболочка над базовым запросом, где в случае сбоя перезапросим access токен
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/refresh_token/', api, extraOptions);

    console.log('refreshResult', refreshResult);

    // если запрос прошел успешно, обновляем токен
    if (refreshResult?.data) {
      api.dispatch(updateToken({ token: refreshResult.data.token }));

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
