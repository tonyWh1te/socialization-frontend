import { apiSlice } from '../apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users/',
      }),
      transformResponse: (res) => res.results,
    }),
  }),
});

// eslint-disable-next-line
export const { useLazyGetUsersQuery, useGetUsersQuery } = usersApiSlice;
