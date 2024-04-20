import { apiSlice } from '../../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/obtain_token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/users/me/',
        method: 'GET',
      }),
      transformResponse: (response) => response.result,
    }),
  }),
});

export const { useLoginMutation, useLazyGetUserInfoQuery } = authApiSlice;
