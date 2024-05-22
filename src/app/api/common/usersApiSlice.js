import { apiSlice } from '../apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => {
        const { type } = params;

        return {
          url: '/users/',
          params: { type },
        };
      },
    }),
  }),
});

// eslint-disable-next-line
export const { useGetUsersQuery } = usersApiSlice;
