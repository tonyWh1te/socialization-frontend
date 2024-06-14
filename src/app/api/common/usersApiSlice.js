import { apiSlice } from '../apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: '/users/',
        params,
      }),
      transformResponse: (res) => res.results,
      providesTags: ['Users'],
    }),
    getObserveds: builder.query({
      query: (params) => ({
        url: '/users/get_observeds/',
        params,
      }),
      providesTags: ['Observeds'],
      transformResponse: (res) => res.results,
    }),
  }),
});

// eslint-disable-next-line
export const { useLazyGetUsersQuery, useGetUsersQuery, useLazyGetObservedsQuery } = usersApiSlice;
