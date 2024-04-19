import { apiSlice } from '../../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/obtain_token/',
        method: 'POST',
        body: credentials,
      }),
      // TODO: потом убрать
      transformResponse: (response) => ({
        access: response.login,
        refresh: response.password,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/users-me/',
        method: 'GET',
      }),
      transformResponse: (response) => response[0],
    }),
  }),
});

export const { useLoginMutation, useLazyGetUserInfoQuery } = authApiSlice;
